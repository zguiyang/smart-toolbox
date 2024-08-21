import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: '',
        port: 465,
        auth: {
          user: '',
          pass: '',
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
