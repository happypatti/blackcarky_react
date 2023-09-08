import Head from 'next/head'
import { AuthLayout } from '@/components/AuthLayout'
import RideRequestForm from '../components/RideRequestForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Footer } from '@/components/Footer'
import CarServiceForm from '@/components/CarServiceForm'

export default function Login() {
  const stripePromise = loadStripe('')
  
  return (
      <AuthLayout>
      <Head>
        <meta
          name="description"
          content="Get there in style."
        />
      </Head>
      <main>
        <CarServiceForm />
      </main>
      <Footer />
      </AuthLayout>
  )
}
