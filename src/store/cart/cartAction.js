import { CART_ACTION_TYPES } from './cartTypes';

import { createAction } from '../../utility/reducer/reducer';

const addCartItem = (cartItems, product) => {
  // find if cartItems contains product
  const existingCartItemIndex = cartItems.findIndex(
    item => item.id === product.id
  );
  const existingCartItem = cartItems[existingCartItemIndex];

  let updatedItems;
  // if found, increment quantity
  if (existingCartItem) {
    const updatedCartItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
    };
    updatedItems = [...cartItems];
    updatedItems[existingCartItemIndex] = updatedCartItem;
  } else {
    updatedItems = cartItems.concat({ ...product, quantity: 1 });
  }

  // return new array with modified cartItems/ new cart item
  return updatedItems;
};

const removeCartItem = (cartItems, product) => {
  // find the cart item to remove
  const existingCartItemIndex = cartItems.findIndex(
    item => item.id === product.id
  );
  const existingCartItem = cartItems[existingCartItemIndex];

  let updatedItems;
  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    updatedItems = cartItems.filter(item => item.id !== product.id);
  }
  // if quantity is not equal to 1, then reduce item quantity
  else {
    const updatedCartItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    updatedItems = [...cartItems];
    updatedItems[existingCartItemIndex] = updatedCartItem;
  }

  // return new array with modified cartItems
  return updatedItems;
};

const clearCartItem = (cartItems, product) => {
  const existingItemIndex = cartItems.findIndex(
    cartItem => cartItem.id === product.id
  );
  const existingItem = { ...cartItems[existingItemIndex] };

  let updatedItems;

  if (existingItem) {
    updatedItems = cartItems.filter(item => item.id !== existingItem.id);
  } else {
    updatedItems = [...cartItems];
  }

  return updatedItems;
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = boolean =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
