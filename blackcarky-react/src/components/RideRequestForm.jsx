import { useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

const RideRequestForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvc: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formResponse, setFormResponse] = useState(null)

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
    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      },
    })

    if (error) {
      console.error(error)
      // Handle payment intent error
    } else {
      window.location.href = data.checkoutUrl
    }

    setSubmitting(false)
    setSubmitted(true)
    setFormResponse(data)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
          Phone
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">
          Card Number
        </label>
        <CardNumberElement
          id="cardNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(event) => setFormData({ ...formData, cardNumber: event.complete ? event.value : '' })}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cardExpMonth" className="block text-gray-700 font-bold mb-2">
          Expiration Date
        </label>
          <div className="w-1/2 mr-2">
            <CardExpiryElement
              id="cardExpMonth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => setFormData({ ...formData, cardExpMonth: event.complete ? event.value.slice(0, 2) : '' })}
              required
            />
          </div>
      </div>
      <div className="mb-4">
        <label htmlFor="cardCvc" className="block text-gray-700 font-bold mb-2">
          CVC
        </label>
        <CardCvcElement
          id="cardCvc"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(event) => setFormData({ ...formData, cardCvc: event.complete ? event.value : '' })}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      {submitted && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{JSON.stringify(formResponse, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}

export default RideRequestForm