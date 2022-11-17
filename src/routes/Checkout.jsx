import { useSelector } from 'react-redux';
import CheckoutItem from '../components/CheckoutItem';
import PaymentForm from '../components/PaymentForm';

// selectors
import { selectCartItems, selectCartTotal } from '../store/cart/cartSelector';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const cartContent =
    cartItems.length > 0 ? (
      cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))
    ) : (
      <p className="m-16">Cart is empty.</p>
    );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartContent}
      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
      <p className="text-red-700 font-bold">
        Please use the following test credit card for payments
      </p>
      <p>4242 4242 4242 4242</p>
      <p>Use a valid future date, such as 12/34</p>
      <p>CVC: 123</p>
      <p>ZIP Code: 00000</p>
    </div>
  );
};

export default Checkout;
