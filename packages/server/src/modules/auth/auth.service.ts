import { Injectable } from '@nestjs/common';

import { AuthCodeEnums } from '../../enums/code.enum';
import { ApiCommonResponse } from '../../types/response.interface';
import { CryptoUtil } from '../../utils/crypto';
import { I18nService } from '../i18n/i18n.service';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { UserDocument, UserStatus } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { InitPasswordDto, ResetPasswordDto, UserLoginDto, ValidateAccountDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
    private readonly mailService: MailService,
  ) {}

  /**
   * user validation function
   * @param username
   * @param pass
   * @returns user object if valid, null otherwise
   * **/
  private async validateUser(username: string, pass: string): Promise<UserDocument | null> {
    const user = await this.userService.findByUsername(username);
    if (user && CryptoUtil.decrypt(user.password) === pass) {
      return user;
    }
    return null;
  }

  /**
   * user login function
   * @param params
   * @returns access token
   * **/
  async login(params: UserLoginDto): Promise<ApiCommonResponse<string>> {
    const validatedUser = await this.validateUser(params.username, params.password);
    if (!validatedUser) {
      return {
        code: AuthCodeEnums.NOT_FOUND_USER,
        data: null,
        msg: this.i18nService.t('auth.validation.notFound'),
      };
    }

    if (validatedUser.status !== UserStatus.NORMAL) {
      return {
        code: AuthCodeEnums.INVALID_ACCOUNT,
        data: null,
        msg: validatedUser.status === UserStatus.DISABLED ? this.i18nService.t('auth.login.userDisabled') : this.i18nService.t('auth.validation.notFound'),
      };
    }
    if (!validatedUser.isInit) {
      return {
        code: AuthCodeEnums.INIT_USER_PASSWORD,
        data: null,
        msg: this.i18nService.t('auth.login.initPasswordFailed'),
      };
    }

    const { accessToken } = await this.jwtService.loginIn(validatedUser);
    return {
      data: accessToken,
    };
  }
  /**
   * Retrieves the validation code for resetting the password.
   *
   * @param {ValidateAccountDto} params - The parameters for validating the account.
   * @return {Promise<ApiCommonResponse>} Response containing the validation code or error message.
   */
  async getResetPsdValidateCode(params: ValidateAccountDto): Promise<ApiCommonResponse> {
    const user = await this.userService.findByUsername(params.username);
    if (!user) {
      return {
        code: AuthCodeEnums.NOT_FOUND_USER,
        data: null,
        msg: this.i18nService.t('auth.validation.notFound'),
      };
    }
    if (user.status !== UserStatus.NORMAL) {
      return {
        code: AuthCodeEnums.INVALID_STATUS,
        data: null,
        msg: this.i18nService.t('auth.auth.statusFailed'),
      };
    }
    const result = await this.mailService.sendVerificationAccountCode(user.email);
    if (!result.success) {
      return {
        success: result.success,
        data: null,
        msg: result.msg,
      };
    }
    return {
      data: null,
      msg: this.i18nService.t('auth.auth.sendResetEmailSuccess'),
    };
  }

  /**
   * Resets the password for a user.
   * @param {ResetPasswordDto} params - The parameters for resetting the password.
   * @return {Promise<ApiCommonResponse<boolean>>} A promise that resolves to an API response indicating the success or failure of the password reset.
   */
  async resetPassword(params: ResetPasswordDto): Promise<ApiCommonResponse<boolean>> {
    const user = await this.userService.findByUsername(params.username);
    const validatedResult = await this.mailService.verificationAccountCode(user.email, params.emailCode);
    if (!validatedResult) {
      return {
        code: '',
        data: null,
        msg: '邮箱验证码错误',
      };
    }

    const result = await this.userService.resetUserPassword(params.username, params.password);
    return {
      data: result,
      msg: result ? '密码重置成功' : '密码重置失败',
    };
  }
  /**
   * Initializes the password for a user.
   * @param {InitPasswordDto} params - The parameters for initializing the password.
   */

  async initPassword(params: InitPasswordDto): Promise<ApiCommonResponse<boolean>> {
    const { oldPassword, password, username } = params;

    const user = await this.validateUser(username, oldPassword);
    if (!user) {
      return {
        code: AuthCodeEnums.NOT_FOUND_USER,
        data: null,
        msg: this.i18nService.t('auth.validation.notFound'),
      };
    }
    if (user.status !== UserStatus.NORMAL) {
      return {
        code: AuthCodeEnums.INVALID_STATUS,
        data: null,
        msg: this.i18nService.t('auth.auth.statusFailed'),
      };
    }

    if (CryptoUtil.decrypt(user.password) === password) {
      return {
        code: '',
        success: false,
        msg: '旧密码不能与新密码相同',
      };
    }

    const success = await this.userService.resetUserPassword(username, password);
    if (success) {
      await this.userService.updateUserInitStatus(user._id.toString(), true);
    }
    return {
      data: success,
      msg: success ? '密码重置成功' : '密码重置失败',
    };
  }
}
