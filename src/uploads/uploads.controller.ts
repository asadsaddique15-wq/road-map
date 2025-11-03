import {Controller,Post,UploadedFile,UseInterceptors,BadRequestException,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './uploads.service';

@Controller('uploads') 
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  //local upload
  @Post('local')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'C:/Users/ASAD/Desktop/AccellionX1/', //destination
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  uploadLocal(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    return {
      message: 'File uploaded locally successfully!',
      filePath: file.filename,
    };
  }

  //cloud upload (to Cloudinary)
  @Post('cloud')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCloud(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    const url = await this.uploadService.uploadToCloudinary(file);
    return {
      message: 'File uploaded to Cloudinary successfully!',
      url,
    };
  }
}
