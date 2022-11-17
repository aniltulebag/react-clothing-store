import { useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import Button from './Button';
import FormInput from './FormInput';

// actions
import { signUpStart } from '../store/user/userAction';

// notification
import { toast } from 'react-toastify';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const notifyError = notifyText => toast.warn(notifyText);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const createUser = async (
    enteredEmail,
    enteredPassword,
    enteredDisplayName
  ) => {
    try {
      console.log(enteredEmail, enteredPassword, enteredDisplayName);
      dispatch(signUpStart(enteredEmail, enteredPassword, enteredDisplayName));

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        alert('user creation encountered an error');
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    const enteredEmail = email.trim();
    const enteredPassword = password.trim();
    const enteredConfirmPassword = confirmPassword.trim();
    const enteredDisplayName = displayName.trim();

    if (!(enteredPassword.length >= 6) || !(enteredConfirmPassword >= 6)) {
      notifyError('Password must be greater than or equal to 6');
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      notifyError('Passwords do not match!');
      return;
    }

    createUser(enteredEmail, enteredPassword, enteredDisplayName);
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

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          id="displayName"
          type="text"
          onChange={changeHandler}
          name="displayName"
          value={displayName}
          required={true}
        />
        <FormInput
          label="Email"
          id="email-sign-up"
          type="email"
          onChange={changeHandler}
          name="email"
          value={email}
          required={true}
        />
        <FormInput
          label="Password"
          id="password-sign-up"
          type="password"
          onChange={changeHandler}
          name="password"
          value={password}
          required={true}
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          onChange={changeHandler}
          name="confirmPassword"
          value={confirmPassword}
          required={true}
        />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
