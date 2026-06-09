import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Checker' },
    { to: '/standards', label: 'Standards' },
    { to: '/volume-one', label: 'Volume One' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/rezteche-logo.png" alt="RezTeche" className="h-12 w-auto object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm">AS Checker</span>
            <span className="text-xs text-slate-400 hidden sm:block">Australian Standards Reference</span>
          </div>
        </Link>
        <div className="flex gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
