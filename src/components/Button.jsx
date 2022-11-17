export const BUTTON_TYPES_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => {
  return {
    [BUTTON_TYPES_CLASSES.base]: 'base',
    [BUTTON_TYPES_CLASSES.google]: 'google-sign-in',
    [BUTTON_TYPES_CLASSES.inverted]: 'inverted',
  }[buttonType];
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const buttonClass = getButton(buttonType);

  return (
    <button
      disabled={isLoading}
      className={`button-container ${buttonClass}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
