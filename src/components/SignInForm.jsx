import { useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import FormInput from './FormInput';
import Button, { BUTTON_TYPES_CLASSES } from './Button';

// actions
import { emailSignInStart, googleSignInStart } from '../store/user/userAction';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const changeHandler = e => {
    const { name, value } = e.target;

    setFormFields(currState => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const getUser = async (enteredEmail, enteredPassword) => {
    try {
      dispatch(emailSignInStart(enteredEmail, enteredPassword));

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('account not found');
          break;
        case 'auth/user-not-found':
          alert('email or password is incorrect');
          break;
        default:
          console.log(error);
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    const enteredEmail = email.trim();
    const enteredPassword = password.trim();

    getUser(enteredEmail, enteredPassword);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          id="email-sign-in"
          type="email"
          onChange={changeHandler}
          name="email"
          value={email}
          required={true}
        />
        <FormInput
          label="Password"
          id="password-sign-in"
          type="password"
          onChange={changeHandler}
          name="password"
          value={password}
          required={true}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            onClick={signInWithGoogle}
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
