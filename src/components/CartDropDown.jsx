import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// selectors
import { selectCartItems } from '../store/cart/cartSelector';
import Button from './Button';
import CartItem from './CartItem';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  const content = cartItems.length ? (
    cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
  ) : (
    <p className="empty-message">Your cart is empty</p>
  );

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{content}</div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
