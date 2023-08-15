import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('')
import React,{ useState } from 'react'


function RideRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    numPassengers: '',
    specialRequests: '',
    cardNumber: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvc: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formResponse, setFormResponse] = useState(null)

  const elements = useElements()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitting(true)

    // Send the form data to your API endpoint
    const response = await fetch('/api/reservation-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    // Create a payment intent and redirect the user to the Stripe checkout page
    const stripe = await stripePromise
    const paymentIntent = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
          card: {
            number: formData.cardNumber,
            exp_month: formData.cardExpMonth,
            exp_year: formData.cardExpYear,
            cvc: formData.cardCvc,
          },
        billing_details: {
          name: formData.name,
          email: formData.email,
        },
      },
    });

    if (paymentIntent.error) {
      console.error(paymentIntent.error)
      // Handle payment intent error
    } else {
      window.location.href = data.checkoutUrl
    }

    setSubmitting(false)
    setSubmitted(true)
    setFormResponse(data)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="pickupLocation" className="block mb-2 font-bold text-gray-700">Pickup Location</label>
        <input type="text" id="pickupLocation" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="dropoffLocation" className="block mb-2 font-bold text-gray-700">Dropoff Location</label>
        <input type="text" id="dropoffLocation" name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="pickupDate" className="block mb-2 font-bold text-gray-700">Pickup Date</label>
        <input type="date" id="pickupDate" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="pickupTime" className="block mb-2 font-bold text-gray-700">Pickup Time</label>
        <input type="time" id="pickupTime" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="numPassengers" className="block mb-2 font-bold text-gray-700">Number of Passengers</label>
        <input type="number" id="numPassengers" name="numPassengers" value={formData.numPassengers} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="specialRequests" className="block mb-2 font-bold text-gray-700">Special Requests</label>
        <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="cardNumber" className="block mb-2 font-bold text-gray-700">Card Number</label>
        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="cardExpMonth" className="block mb-2 font-bold text-gray-700">Expiration Month</label>
        <input type="text" id="cardExpMonth" name="cardExpMonth" value={formData.cardExpMonth} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="cardExpYear" className="block mb-2 font-bold text-gray-700">Expiration Year</label>
        <input type="text" id="cardExpYear" name="cardExpYear" value={formData.cardExpYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="cardCvc" className="block mb-2 font-bold text-gray-700">CVC</label>
        <input type="text" id="cardCvc" name="cardCvc" value={formData.cardCvc} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <button type="submit" disabled={submitting} className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {submitting ? 'Submitting...' : 'Submit'}
      </button>

      {submitted && formResponse && (
        <div className="mt-4">
          <p className="mb-2 font-bold text-gray-700">Reservation submitted successfully!</p>
          <p>Payment intent client secret: {formResponse.clientSecret}</p>
        </div>
      )}
    </form>
  )
}

export default RideRequestForm