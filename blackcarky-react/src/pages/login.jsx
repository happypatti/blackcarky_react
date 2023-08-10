import Head from 'next/head'
import { AuthLayout } from '@/components/AuthLayout'
import RideRequestForm from '../components/RideRequestForm';
import { Footer } from '@/components/Footer'

export default function Login() {
  return (
      <AuthLayout>
      <Head>
        <title>Black Car KY</title>
        <meta
          name="description"
          content="Get there in style."
        />
      </Head>
      <main>
        <RideRequestForm />
      </main>
      <Footer />
      </AuthLayout>
  )
}
