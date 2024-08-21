import { Global, Module } from '@nestjs/common';
import { AcceptLanguageResolver, HeaderResolver, I18nModule as NestI18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';

import { I18nService } from './i18n.service';

@Global()
@Module({
  imports: [
    NestI18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(process.cwd(), 'dist', 'src', '/locales/'),
            watch: true,
          },
          // disableMiddleware: true,
          typesOutputPath: path.join(process.cwd(), 'src/generated/locales.ts'),
        };
      },
      resolvers: [new QueryResolver(['lang']), AcceptLanguageResolver, new HeaderResolver(['system-lang'])],
      inject: [],
    }),
  ],
  providers: [I18nService],
  exports: [I18nService],
})
export class I18nModule {}
