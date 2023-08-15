export default function handler(req, res) {
  const { name, email, pickupLocation, dropoffLocation, pickupDate, pickupTime, numPassengers, specialRequests } = req.body

  console.log(`Name: ${name}\nEmail: ${email}\nPickup Location: ${pickupLocation}\nDropoff Location: ${dropoffLocation}\nPickup Date: ${pickupDate}\nPickup Time: ${pickupTime}\nNumber of Passengers: ${numPassengers}\nSpecial Requests: ${specialRequests}`)

  const formData = {
    name,
    email,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    pickupTime,
    numPassengers,
    specialRequests,
  }

  res.status(200).json({ 
    message: 'Form submitted successfully', 
    formData,
  })

  console.log(req.body)
}