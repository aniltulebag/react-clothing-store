import { useDispatch, useSelector } from 'react-redux';

// components
import Button, { BUTTON_TYPES_CLASSES } from './Button';

// selectors
import { selectCartItems } from '../store/cart/cartSelector';

// actions
import { addItemToCart } from '../store/cart/cartAction';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        onClick={addToCartHandler}
        buttonType={BUTTON_TYPES_CLASSES.inverted}
      >
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
