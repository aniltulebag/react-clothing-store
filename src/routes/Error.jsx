import { Fragment } from 'react';
import { Link, useRouteError } from 'react-router-dom';

// components
import Navigation from './Navigation';

const Error = () => {
  const error = useRouteError();

  return (
    <Fragment>
      <header>
        <Navigation />
      </header>
      <main className="text-center">
        <h1 className="my-4 text-center">An error occurred!</h1>
        <p className="my-4 text-center">{`${error.status} ${error.statusText}`}</p>
        <Link
          className="my-4 p-2 bg-slate-700 text-white rounded-md shadow-md"
          to="/"
        >
          Go To Home Page
        </Link>
      </main>
    </Fragment>
  );
};

export default Error;
