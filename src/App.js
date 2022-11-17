import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import Shop from './routes/Shop';
import CategoriesPreview from './routes/CategoriesPreview';
import Category from './routes/Category';
import Authentication from './routes/Authentication';
import Checkout from './routes/Checkout';
import Error from './routes/Error';

// actions
import { checkUserSession } from './store/user/userAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/shop',
        element: <Shop />,
        children: [
          { index: true, element: <CategoriesPreview /> },
          { path: ':category', element: <Category /> },
        ],
      },
      { path: '/auth', element: <Authentication /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
