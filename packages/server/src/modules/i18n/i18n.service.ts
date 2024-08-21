import { Injectable } from '@nestjs/common';
import { I18nContext as NestI18nContext, I18nService as NestI18nService, TranslateOptions } from 'nestjs-i18n';

import { I18nTranslations } from '../../generated/locales';
import { I18nLocaleKeys } from '../../types/utils';

@Injectable()
export class I18nService {
  constructor(private readonly i18nService: NestI18nService<I18nTranslations>) {}

  translate(key: I18nLocaleKeys, options: TranslateOptions = {}) {
    return this.i18nService.translate(key, {
      lang: NestI18nContext.current<I18nTranslations>()?.lang,
      ...options,
    });
  }

  t(key: I18nLocaleKeys, options: TranslateOptions = {}) {
    return this.translate(key, options);
  }
}
