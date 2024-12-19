import { useState } from 'react';
import PaystackPayment from '../components/PaystackPayments';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSuccess = async (reference) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference: reference.reference }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus('Payment verification failed!');
      }
    } catch (error) {
      setPaymentStatus('Error verifying payment!');
    }
  };

  const handleClose = () => {
    setPaymentStatus('Payment window closed.');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <PaystackPayment amount={amount} email={email} onSuccess={handleSuccess} onClose={handleClose} />
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Checkout;
