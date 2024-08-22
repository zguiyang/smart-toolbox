import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout } from '@/layouts';

import { lazyElementLoader } from './utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        index: true,
        element: lazyElementLoader(() => import('@/pages/site-navigation')),
      },
      {
        path: '/favorites',
        element: lazyElementLoader(() => import('@/pages/favorites')),
      },
      {
        path: '/utilities',
        element: lazyElementLoader(() => import('@/pages/utilities')),
      },
    ],
  },
]);

export default router;
