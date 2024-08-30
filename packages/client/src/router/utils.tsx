import { isFunction } from 'lodash-es';
import { Suspense, lazy } from 'react';

import PageLoading from '@/components/common/page-loading';

export function lazyElementLoader(importFn: () => Promise<any>) {
  if (isFunction(importFn)) {
    const LazyComponent = lazy(importFn);
    return (
      <Suspense fallback={<PageLoading />}>
        <LazyComponent />
      </Suspense>
    );
  }
  return null;
}
