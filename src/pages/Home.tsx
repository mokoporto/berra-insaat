import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Stats from '@/sections/Stats'
import About from '@/sections/About'
import Services from '@/sections/Services'
import Projects from '@/sections/Projects'
import KamuKent from '@/sections/KamuKent'
import Teklifler from '@/sections/Teklifler'
import Process from '@/sections/Process'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Projects />
        <KamuKent />
        <Teklifler />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
