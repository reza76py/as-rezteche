import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import CheckerPage from './pages/CheckerPage'
import StandardsPage from './pages/StandardsPage'
import AboutPage from './pages/AboutPage'
import VolumePage from './pages/VolumePage'

function App() {
  return (
    <div className="min-h-screen bg-darkbg flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<CheckerPage />} />
          <Route path="/standards" element={<StandardsPage />} />
          <Route path="/volume-one" element={<VolumePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
