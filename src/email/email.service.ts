// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor(private readonly configService: ConfigService) {
//     //configure nodemailer transporter
//     this.transporter = nodemailer.createTransport({
//       host: this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com',
//       port: Number(this.configService.get<string>('SMTP_PORT')) || 465,
//       secure: true, //must be true for port 465
//       auth: {
//         user: this.configService.get<string>('SMTP_USER'),
//         pass: this.configService.get<string>('SMTP_PASS'),
//       },
//     });
//   }

//   async sendEmail(to: string, subject: string, html: string) {
//     try {
//       //use email from env or default to SMTP_USER
//       const from =
//         this.configService.get<string>('EMAIL_FROM') ||
//         this.configService.get<string>('SMTP_USER');

//       //send email
//       const info = await this.transporter.sendMail({
//         from,
//         to,
//         subject,
//         html,
//       });

//       console.log('Email sent successfully:', info.messageId);

//       return {
//         success: true,
//         message: 'Email sent successfully',
//         messageId: info.messageId,
//         to,
//       };
//     } catch (error) {
//       console.error('Email sending failed:', error);
//       throw new InternalServerErrorException('Failed to send email');
//     }
//   }
// }
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    //nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com',
      port: Number(this.configService.get<string>('SMTP_PORT')) || 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  //send a simple email
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const from = this.configService.get<string>('EMAIL_FROM') || this.configService.get<string>('SMTP_USER');
      const info = await this.transporter.sendMail({ from, to, subject, html });
      return { to, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  //handlebars template
  async sendTemplatedEmail(to: string, subject: string, template: string, context: Record<string, any>) {
  try {
    const templatePath = path.join(process.cwd(), 'src', 'email', 'templates', `${template}.hbs`);
    console.log('Looking for template at:', templatePath);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found at path: ${templatePath}`);
    }

    const source = fs.readFileSync(templatePath, 'utf8');
    const compiled = handlebars.compile(source);
    const html = compiled(context);

    console.log('Template compiled successfully, sending email...');

    const result = await this.sendEmail(to, subject, html);
    console.log('Email sent result:', result);

    return result;
  } catch (error) {
    console.error('Templated email failed:', error);
    throw new InternalServerErrorException('Failed to send templated email');
  }
}

}
