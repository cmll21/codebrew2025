// CheckoutButton.tsx
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import React from 'react'
import Button from './Button'

const stripePromise = loadStripe('pk_test_51JR5IPEgX0iyXAwM0gngj2orKRh3F7kqw6tW5QKTVfXLwJ0NeALoZtWIfo6c1C0xWQn45PFW52RSYSP5BadkPJFZ00CoUzqi7l')  // your public key


type CheckoutButtonProps = {
  amount: number
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount }) => {
  const handleClick = async () => {
    try {
      const { data } = await axios.post<{ sessionId: string }>(
        '/payments/create-checkout-session/',
        {
          amount,
          currency: 'aud',
          product_name: 'Cart',
        }
      )
      const stripe = await stripePromise
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      }
    } catch (err) {
      console.error('Checkout error', err)
    }
  }

  return (
    <Button
      // text={`Pay AUD ${amount.toFixed(2)}`}
      text={`Checkout`}
      handleClick={handleClick}
    />
  )
}

export default CheckoutButton
