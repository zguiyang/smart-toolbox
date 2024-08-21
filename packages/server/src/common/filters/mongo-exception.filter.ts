import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';

import { ResponseCodeEnums } from '../../enums/code.enum';
import { I18nService } from '../../modules/i18n/i18n.service';

@Catch(MongooseError)
export class MongooseErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongooseErrorFilter.name);
  constructor(private readonly i18n: I18nService) {}
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const lang = request['i18nLang'] || 'en';

    let message = '';

    this.logger.error(exception);

    switch (exception.name) {
      case 'ValidationError':
        message = this.i18n.t('common.databaseValidationError', { lang });
        break;
      case 'CastError':
        message = this.i18n.t('common.databaseTypeError', { lang });
        break;
      default:
        message = this.i18n.t('common.databaseError', { lang });
        break;
    }

    response.status(500).json({
      code: ResponseCodeEnums.DATABASE_ERROR,
      lang,
      success: false,
      msg: message,
      path: request.url,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  }
}
