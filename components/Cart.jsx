import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic'; // Import dynamic for client-side loading


import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe'


// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), {
  ssr: false,
});;

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const [email, setEmail] = useState('');

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY; // Add your Paystack public key to .env file

  const handlePaystackSuccess = async (reference) => {
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
        toast.success('Payment successful!');
      } else {
        setPaymentStatus('Payment verification failed!');
        toast.error('Payment verification failed!');
      }
    } catch (error) {
      setPaymentStatus('Error verifying payment!');
      toast.error('Error verifying payment!');
    }
  };

  const handlePaystackClose = () => {
    setPaymentStatus('Payment window closed.');
    toast.error('Payment window closed.');
  };



  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>Ksh {item.price.toLocaleString()}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>ksh {totalPrice.toLocaleString()}</h3>
            </div>
            {/* Email input for collecting user's email */}
            <div className="email-input">
            <input
               type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-field"
              />
            </div>

            <div className="btn-container">
              <PaystackButton
                  publicKey={publicKey}
                  email={email}
                  amount={totalPrice * 100} // Convert to kobo
                  currency="KES"
                  text="Pay with Paystack"
                  onSuccess={handlePaystackSuccess}
                  onClose={handlePaystackClose}
                  className='btn'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart