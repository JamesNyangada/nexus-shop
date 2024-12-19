import { useEffect } from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ amount, email, onSuccess, onClose }) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY; // Store key securely in .env file

  return (
    <PaystackButton
      publicKey={publicKey}
      email={email}
      amount={amount * 100} // Paystack accepts amounts in kobo (1 KES = 100 kobo)
      currency="KES"
      text="Pay Now"
      onSuccess={onSuccess}
      onClose={onClose}
    />
  );
};

export default PaystackPayment;
