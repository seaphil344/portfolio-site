import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0A0A0B]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Portfolio
            </Link>
            <p className="text-gray-400">
              Building digital experiences that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/projects" className="text-gray-400 hover:text-blue-400 transition-colors">
                Projects
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Connect</h3>
            <div className="flex gap-4">
              <Link 
                href="https://github.com"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </Link>
              <Link 
                href="https://linkedin.com"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Cameron Philbert. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}