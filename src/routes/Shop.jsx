import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

// actions
import { fetchCategoriesStart } from '../store/categories/categoriesAction';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default Shop;
