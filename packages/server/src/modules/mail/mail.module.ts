import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.163.com',
        port: 465,
        auth: {
          user: 'zhaoguiyang18@163.com',
          pass: 'YZMXLQRVPTIUZQRP',
        },
      },
      defaults: {
        from: '"文件在线管理系统" <zhaoguiyang18@163.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
