import { useState } from 'react'

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
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      setFormResponse(data.formData)
      setSubmitted(true)
    } else {
      console.log('Error submitting form')
    }

    setSubmitting(false)
  }

  return (
    <div>
      {submitted ? (
        <div>
          <p>Thank you for your submission!</p>
          <p>Here's the data you submitted:</p>
          <pre>{JSON.stringify(formResponse, null, 2)}</pre>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} />

          <label htmlFor="dropoffLocation">Dropoff Location:</label>
          <input type="text" name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} />

          <label htmlFor="pickupDate">Pickup Date:</label>
          <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} />

          <label htmlFor="pickupTime">Pickup Time:</label>
          <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} />

          <label htmlFor="numPassengers">Number of Passengers:</label>
          <input type="number" name="numPassengers" value={formData.numPassengers} onChange={handleChange} />

          <label htmlFor="specialRequests">Special Requests:</label>
          <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  )
}

export default RideRequestForm