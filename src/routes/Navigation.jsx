import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// selectors
import { selectCurrentUser } from '../store/user/userSelector';
import { selectIsCartOpen } from '../store/cart/cartSelector';

// actions
import { signOutStart } from '../store/user/userAction';

import logo from '../assets/logo.svg';
import CartDropDown from '../components/CartDropDown';
import CartIcon from '../components/CartIcon';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => {
    dispatch(signOutStart());
  };

  return (
    <nav className="navigation-container">
      <Link to="/" className="logo-contaier">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul className="navigation-links">
        <li>
          <NavLink to="/shop" className="navigation-link">
            SHOP
          </NavLink>
        </li>
        {currentUser ? (
          <li>
            <span onClick={signOutUser} className="navigation-link">
              SIGN OUT
            </span>
          </li>
        ) : (
          <li>
            <NavLink to="/auth" className="navigation-link">
              SIGN IN
            </NavLink>
          </li>
        )}
        <li>
          <CartIcon />
        </li>
        {isCartOpen && <CartDropDown />}
      </ul>
    </nav>
  );
};

export default Navigation;
