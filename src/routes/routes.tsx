import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/home'
import { DefaultLayout } from '../layouts/default-layout'
import { History } from '../pages/history'

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/history',
          element: <History />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
