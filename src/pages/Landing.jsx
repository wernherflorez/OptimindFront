import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Services from '../components/landing/Services'
import Process from '../components/landing/Process'
import Portfolio from '../components/landing/Portfolio'
import Team from '../components/landing/Team'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'
import Chatbot from '../components/landing/Chatbot'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}
