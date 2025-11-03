import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import streamifier from 'streamifier'; 

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {
    //cloudinary from environment variables
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
     //upload
  async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const resourceType =
          file.mimetype.startsWith('image/') ? 'image' :
          file.mimetype.startsWith('video/') ? 'video' :
          'raw';

        //cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'uploads',
            resource_type: resourceType,
            public_id: file.originalname.split('.')[0],
            use_filename: true,
            unique_filename: false,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload failed:', error);
              return reject(new InternalServerErrorException('Cloud upload failed'));
            }

            if (!result?.secure_url) {
              console.error(' No result from Cloudinary');
              return reject(new InternalServerErrorException('No result from Cloudinary'));
            }

            console.log(`Uploaded to Cloudinary as ${resourceType}:`, result.secure_url);
            resolve(result.secure_url);
          },
        );

        //file buffer to fix corruption for txt/docx/pdf
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } catch (error) {
        console.error('Exception during Cloudinary upload:', error);
        reject(new InternalServerErrorException('Cloud upload failed'));
      }
    });
  }

}

