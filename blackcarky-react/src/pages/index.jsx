import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import CarServiceForm from '@/components/CarServiceForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Used Tire & Auto Repair</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <div class="relative bg-black overflow-hidden">
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <CarServiceForm />
      </main>
      <Footer />
      </div>
    </>
  )
}
