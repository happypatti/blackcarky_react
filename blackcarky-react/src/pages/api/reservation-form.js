const stripe = require('stripe')('')

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, pickupLocation, dropoffLocation, pickupDate, pickupTime, numPassengers, specialRequests, cardNumber, cardExpMonth, cardExpYear, cardCvc } = req.body
      
        try {
          // Create a payment intent on the server-side
          const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Replace with the actual amount
            currency: 'usd', // Replace with the actual currency
          })
      
          // Return the client_secret value as part of the response
          res.json({
            clientSecret: paymentIntent.client_secret,
            checkoutUrl: 'https://blackcarky.com/register',
          })
        } catch (error) {
          console.error(error)
          res.status(500).send('An error occurred while processing your payment')
        }
      }
    }