import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Character3D from './components/Character3D'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './index.css'

function App() {
  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <Character3D />
        <Services />
        <Portfolio />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
