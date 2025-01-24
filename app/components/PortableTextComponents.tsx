import { PortableTextComponents as Components } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'

export const PortableTextComponents: Components = {
  block: {
    h1: ({children}) => (
      <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-bold text-white mt-6 mb-4">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({children, value}) => (
      <Link 
        href={value?.href ?? '#'} 
        className="text-blue-400 hover:text-blue-300 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
    code: ({children}) => (
      <code className="bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({value}) => (
      <div className="my-8 relative">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog post image'}
          width={800}
          height={500}
          className="rounded-lg"
        />
        {value.caption && (
          <p className="text-sm text-gray-400 mt-2 text-center">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({value}) => (
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-sm font-mono text-gray-300">
          {value.code}
        </code>
      </pre>
    ),
  },
}