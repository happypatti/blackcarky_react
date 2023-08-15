import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'


export default function Home() {
    return (
      <>
        <Head>
          <title>Black Car KY</title>
          <meta
            name="Your transportation partner in Kentucky"
            content="Black Car KY is your transportation partner in Kentucky. We offer a wide range of services including airport transfers, corporate travel, and more."
          />
        </Head>
        <Header />
        <main>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Under construction</h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Coming soon!</p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">We are working hard to get this page up and running. Please check back soon.</p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
      </>
    )
  }