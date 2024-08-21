import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import { ResponseCodeEnums } from '../../enums/code.enum';
import { I18nService } from '../../modules/i18n/i18n.service';
import { ApiResponse } from '../../types/response.interface';
import { isValidJsonObject } from '../../utils/helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  constructor(private readonly i18nService: I18nService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const errorMsg = exceptionResponse?.message || exception.message;
    const lang = request['i18nLang'] || 'en';

    this.logger.error(`Request error: ${errorMsg}`, exception);

    const isValidationError = exceptionResponse?.errorType && exceptionResponse.errorType === ZodError.name;
    const errorRes = exceptionResponse?.error;

    if (isValidationError) {
      // To internationalize the error messages for parameter validation
      (errorRes as ZodIssue).message = this.i18nService.t(errorRes.message, { lang });
    }

    const errorResponse: ApiResponse<any> = {
      code: ResponseCodeEnums.REQUEST_ERROR,
      success: false,
      msg: isValidationError ? errorRes.message : errorMsg,
      error: isValidJsonObject(errorRes) ? JSON.parse(errorRes) : errorRes,
      data: null,
      lang,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
