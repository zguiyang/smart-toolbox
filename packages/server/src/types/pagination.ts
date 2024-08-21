import { ApiCommonResponse } from './response.interface';

export enum PageDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PageListRequest {
  page: number;
  pageSize: number;
  orderBy?: string;
  direction?: PageDirectionEnum;
}
export interface PageListData<T = any> {
  content: T[];
  page: number;
  pages: number;
  pageSize: number;
  total: number;
}
export type PageListResponse<T = any> = ApiCommonResponse<PageListData<T>>;
