import { lazy, Suspense } from 'react'
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'

import Footer from '@/sections/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

// Ekran altı bölümler tembel yüklenir; ilk açılış JS'i küçülür
const Stats = lazy(() => import('@/sections/Stats'))
const About = lazy(() => import('@/sections/About'))
const Services = lazy(() => import('@/sections/Services'))
const Projects = lazy(() => import('@/sections/Projects'))
const KamuKent = lazy(() => import('@/sections/KamuKent'))
const Teklifler = lazy(() => import('@/sections/Teklifler'))
const Process = lazy(() => import('@/sections/Process'))
const Contact = lazy(() => import('@/sections/Contact'))

function SectionFallback() {
  return <div className="py-24" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Stats />
          <About />
          <Services />
          <Projects />
          <KamuKent />
          <Teklifler />
          <Process />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
