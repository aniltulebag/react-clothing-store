import { useDispatch, useSelector } from 'react-redux';

// selectors
import { selectCartCount, selectIsCartOpen } from '../store/cart/cartSelector';

// actions
import { setIsCartOpen } from '../store/cart/cartAction';

import { ReactComponent as ShoppingSvg } from '../assets/shopping-bag.svg';

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div onClick={toggleCartHandler} className="cart-icon-container">
      <ShoppingSvg className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
