import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'PERMISSION_CODES';
export const Permission = (...codes: string[]) => SetMetadata(PERMISSION_KEY, codes);
