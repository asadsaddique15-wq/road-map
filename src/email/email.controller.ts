// import { Controller, Post, Body } from '@nestjs/common';
// import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
// import { EmailService } from './email.service';

// @ApiTags('Email')
// @Controller('email')
// export class EmailController {
//   constructor(private readonly emailService: EmailService) {}

//   @Post('')
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         to: { type: 'string', example: 'user@example.com' },
//         subject: { type: 'string', example: 'Welcome to Roadmap App!' },
//         message: { type: 'string', example: '<h1>Hello, welcome aboard!</h1>' },
//       },
//     },
//   })
//   @ApiResponse({ status: 201, description: 'Email sent successfully.' })
//   @ApiResponse({ status: 500, description: 'Failed to send email.' })
//   async sendEmail(
//     @Body() body: { to: string; subject: string; message: string },
//   ) {
//     const { to, subject, message } = body;
//     const response = await this.emailService.sendEmail(to, subject, message);
//     return { success: true, message: response };
//   }
// }
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  //simple email
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'user@example.com' },
        subject: { type: 'string', example: 'Hello from Roadmap App!' },
        html: { type: 'string', example: '<h1>Welcome to our platform!</h1>' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Email sent successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to send email.' })
  async sendBasicEmail(@Body() body: { to: string; subject: string; html: string }) {
    const { to, subject, html } = body;
    const result = await this.emailService.sendEmail(to, subject, html);
    return { success: true, message: 'Email sent successfully', result };
  }

  //templated email
  @Post('template')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'user@example.com' },
        subject: { type: 'string', example: 'Welcome Email' },
        template: { type: 'string', example: 'welcome' },
        context: {
          type: 'object',
          example: {
            name: 'Asad Siddique',
            customMessage: 'Your account has been created successfully!',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Templated email sent successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to send templated email.' })
  async sendTemplateEmail(
    @Body() body: { to: string; subject: string; template: string; context: Record<string, any> },
  ) {
    const { to, subject, template, context } = body;
    const result = await this.emailService.sendTemplatedEmail(to, subject, template, context);
    return { success: true, message: 'Templated email sent successfully', result };
  }
}
