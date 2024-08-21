import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (result.success) {
      return result.data;
    } else {
      const errors = result.error.errors;
      throw new BadRequestException({
        error: errors[0], // only need show the first error message
        message: 'Validation failed',
        errorType: ZodError.name,
      });
    }
  }
}
