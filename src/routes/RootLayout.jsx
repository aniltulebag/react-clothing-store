import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

// components
import Navigation from './Navigation';
import Footer from './Footer';

// notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <Fragment>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </Fragment>
  );
};

export default RootLayout;
