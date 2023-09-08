import Head from 'next/head'
import { Header } from '@/components/Header'
import { AuthLayout } from '@/components/AuthLayout'
import CarServiceForm from '@/components/contactForm'
import { Footer } from '@/components/Footer'

export default function Login() {
  return (
      <AuthLayout>
      <Head>
        <title>Black Car KY</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <main>
        <CarServiceForm />
      </main>
      <Footer />
      </AuthLayout>
  )
}
