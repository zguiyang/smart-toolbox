import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
  ) {}

  private sendVerificationAccountKey = 'validation_account_code';

  private generateRandomCode() {
    return Math.floor(Math.random() * 900000 + 100000)
      .toString()
      .substring(0, 6);
  }

  private async canSendVerificationCode(key: string) {
    const result = await this.redisService.get(key);
    return !!result;
  }
  async sendMail({ to, title, html }: { to: string; title: string; html: string }) {
    try {
      return await this.mailerService.sendMail({
        to,
        subject: title,
        html,
      });
    } catch (err: any) {
      console.log('邮件发送失败');
      throw new Error(err);
    }
  }
  /**
   * validate user account
   * send verification code to email
   * @param email target email
   * @param expiration expiration time in minutes
   * **/
  async sendVerificationAccountCode(email: string, expiration: number = 5): Promise<{ success: boolean; msg: string }> {
    const sendKey = `${this.sendVerificationAccountKey}:${email}`;
    const isCanSend = await this.canSendVerificationCode(sendKey);
    if (isCanSend) {
      return {
        success: false,
        msg: '验证码发送频繁',
      };
    }

    try {
      const code = this.generateRandomCode();
      await this.redisService.set(sendKey, code, 'EX', expiration * 60);
      await this.sendMail({
        to: email,
        title: '重置密码验证',
        html: `<p style="font-size: 16px;">
      欢迎注册文件在线管理系统, 你的验证码是：<b>${code}</b>, 有效期${expiration}分钟
      </p>`,
      });
      return {
        success: true,
        msg: '验证码发送成功',
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async verificationAccountCode(email: string, code: string) {
    const expectedCode = await this.redisService.get(`${this.sendVerificationAccountKey}:${email}`);
    if (expectedCode === code) {
      return true;
    }
    return false;
  }
}
