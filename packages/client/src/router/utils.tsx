import { isFunction } from 'lodash-es';
import { Suspense, lazy } from 'react';

import PageLoading from '@/components/page-loading';

export function lazyElementLoader(importFn: () => any) {
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
