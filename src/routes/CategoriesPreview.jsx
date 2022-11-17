import { Fragment } from 'react';
import { useSelector } from 'react-redux';

// components
import CategoryPreview from '../components/CategoryPreview';

// selectors
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../store/categories/categoriesSelector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const content = isLoading ? (
    <p>Loading</p>
  ) : (
    Object.keys(categoriesMap).map(title => {
      const products = categoriesMap[title];

      return <CategoryPreview key={title} title={title} products={products} />;
    })
  );

  return <Fragment>{content}</Fragment>;
};

export default CategoriesPreview;
