import { createSelector } from 'reselect';

export const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  cart => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cart => cart.isCartOpen
);

//! generate new cartCount
export const selectCartCount = createSelector([selectCartItems], cartItems => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);
});

//! generate new cartTotal
export const selectCartTotal = createSelector([selectCartItems], cartItems => {
  return cartItems.reduce((sum, currItem) => {
    return sum + currItem.quantity * currItem.price;
  }, 0);
});
