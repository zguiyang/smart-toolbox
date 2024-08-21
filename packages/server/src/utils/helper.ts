export function isValidJsonObject(str: string) {
  if (!/^\s*\{[\s\S]*\}\s*$/.test(str)) {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * filter invalid params, values with undefined, null, ''
 * @param obj
 * **/

type FilterKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K;
}[keyof T];

export function filterInvalidParams<T extends Record<string, any>>(obj: T) {
  const result = {} as { [K in keyof T]: T[K] };
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  return result as Pick<T, FilterKeys<T, undefined | null | ''>>;
}

/**
 * Calculates the total number of pages based on the given data count and page size.
 *
 * @param {number} dataCount - The total number of data records.
 * @param {number} pageSize - The number of data records per page.
 * @return {number} The total number of pages.
 */
export function calculateTotalPages(dataCount: number, pageSize: number): number {
  // 确保 pageSize 和 dataCount 是有效的数值且大于 0
  if (dataCount <= 0 || pageSize <= 0) {
    return 0;
  } else {
    // 计算总页数
    return Math.ceil(dataCount / pageSize);
  }
}

/**
 * get date range query
 * **/

export function getDateRangeQuery(start?: string, end?: string) {
  if (!start || !end) {
    return null;
  }
  const startOfDay = new Date(`${start}T00:00:00`);
  const endOfDay = new Date(`${end}T23:59:59`);

  return {
    $gte: startOfDay,
    $lte: endOfDay,
  };
}
