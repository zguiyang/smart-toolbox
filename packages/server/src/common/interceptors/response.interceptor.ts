import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseCodeEnums } from '../../enums/code.enum';
import { I18nService } from '../../modules/i18n/i18n.service';
import { ApiResponse } from '../../types/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}
  intercept(context: ExecutionContext, next: CallHandler<ApiResponse>): Observable<ApiResponse> {
    const request = context.switchToHttp().getRequest();
    const lang = request['i18nLang'] || 'en';

    return next.handle().pipe<ApiResponse>(
      map((res) => {
        return {
          code: res?.code || ResponseCodeEnums.SUCCESS,
          success: res && res.code ? ResponseCodeEnums.SUCCESS === res?.code : true,
          data: res?.data || null,
          lang,
          msg: res?.msg || this.i18n.t('common.success'),
          timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };
      }),
    );
  }
}
