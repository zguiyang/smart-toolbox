import { ResponseCodeEnums } from '../enums/code.enum';

export interface ApiResponse<T = any> {
  success: boolean;
  code: ResponseCodeEnums | string | number;
  data: T;
  lang: string;
  msg?: string;
  timestamp?: string;
  error?: any;
  path?: string;
}

export type ApiCommonResponse<T = any> = Partial<ApiResponse<T>>;
