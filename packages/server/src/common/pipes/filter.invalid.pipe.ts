import { Injectable, PipeTransform } from '@nestjs/common';
import { isObject } from 'radash';

import { filterInvalidParams } from '../../utils/helper';

@Injectable()
export class FilterInvalidPipe implements PipeTransform {
  transform(value: any) {
    if (isObject(value)) {
      return filterInvalidParams(value);
    }
    return value;
  }
}
