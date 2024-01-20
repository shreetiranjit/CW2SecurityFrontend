// External Import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Internal Import
import LoadingIcon from '../assets/loading.gif';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '../redux/actions/orderActions';
import { removeCartItem } from '../redux/actions/cartActions';

export default function CheckoutForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const Address = useSelector(state => state.Address.selectedDeliveryAddress);
  const BillingAddress = useSelector(state => state.Address.selectedBillingAddress);
  const cartProducts = useSelector(state => state.Cart.products);
  const User = useSelector(state => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async ev => {
    ev.preventDefault();
    setSuccessMessage('Payment Succeeded. Creating Order...');

    const orderedProducts = cartProducts.filter(product => product.selected === true);
    let total_amount = 0;
    let orderedProductCount = 0;
    let groupId = uuidv4();
    orderedProducts.forEach(item => (total_amount += item.price * item.qty));

    orderedProducts.forEach(item => {
      const orderData = {
        billingAddress: BillingAddress,
        deliveryAddress: Address,
        user: User._id,
        seller: item.seller,
        Product: {
          product: item.product,
          color: item.color,
          quantity: item.qty
        },
        totalAmount: total_amount,
        groupId
      };
      dispatch(createOrder(orderData));
      dispatch(removeCartItem(item.product, item.color));
      orderedProductCount++;
    });

    if (orderedProductCount === orderedProducts.length) {
      setSuccessMessage('Products Ordered. Redirecting...');
      setTimeout(() => {
        navigate('/user/orders');
      }, [1000]);
    }
  };
  return (
    <form id='payment-form' onSubmit={handleSubmit} className='mt-3'>
      <div className='row d-flex justify-content-center mt-3'>
        <button id='submit' className='default-btn'>
          <span id='button-text'>Pay now</span>
        </button>
      </div>
      {successMessage && (
        <div className='text-success' style={{ fontWeight: 'bold' }}>
          {successMessage}
        </div>
      )}
    </form>
  );
}
