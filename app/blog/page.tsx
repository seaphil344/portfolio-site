import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: any
  publishedAt: string
  excerpt: string
  author: {
    name: string
    image: any
  }
}

async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      author->{
        name,
        image
      }
    }
  `)
  return posts
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post: Post) => (
          <Link 
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 
              hover:border-gray-700 transition-all duration-200"
          >
            {post.mainImage && (
              <div className="relative h-64 w-full">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-all duration-200 
                    group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                {post.author.image && (
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-gray-300">{post.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 
                transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}