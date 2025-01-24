'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0B]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Portfolio
          </Link>
          <div className="flex items-center gap-8">
            <Link 
              href="/projects" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/contact"
              className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 
                hover:bg-blue-500/20 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}