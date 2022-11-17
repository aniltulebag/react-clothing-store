import { USER_ACTION_TYPES } from './userTypes';

import { createAction } from '../../utility/reducer/reducer';

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
};

export const emailSignInStart = (email, password) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
  });
};
export const googleSignInStart = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
};

// sign in
export const signInSuccess = user => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
};
export const signInFailed = error => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
};

// sign up
export const signUpStart = (email, password, displayName) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });
};
export const signUpSuccess = (user, additionalDetails) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails,
  });
};
export const signUpFailed = error => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
};

// sign out
export const signOutStart = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
};
export const signOutSuccess = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
};
export const signOutFailed = error => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
};
