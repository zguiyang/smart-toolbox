import { I18nTranslations } from '../generated/locales';

export type TranslationKeys<T extends object, P extends string = ''> = {
  [K in keyof T]: T[K] extends object ? TranslationKeys<T[K], `${P}${K & string}.`> : `${P}${K & string}`;
}[keyof T];

export type I18nLocaleKeys = TranslationKeys<I18nTranslations>;
