import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// selectors
import { selectCartTotal } from '../store/cart/cartSelector';
import { selectCurrentUser } from '../store/user/userSelector';
import Button, { BUTTON_TYPES_CLASSES } from './Button';

// notification
import { toast } from 'react-toastify';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const notifyError = notifyText => toast.warn(notifyText);
  const notifySuccess = notifyText => toast.success(notifyText);

  const paymentHandler = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(response => response.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      notifyError(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        notifySuccess('Payment Successful');
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES_CLASSES.inverted}
        >
          Pay now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
