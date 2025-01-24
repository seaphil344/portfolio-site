import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  content: any
  mainImage?: {
    asset: any
  }
  publishedAt: string
  author: {
    name: string
    image?: any
    bio?: any
  }
  tags: string[]
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        content,
        mainImage,
        publishedAt,
        author->{
          name,
          image,
          bio
        },
        tags
      }
    `, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-24">
      {/* Header */}
      <header className="mb-16">
        {post.mainImage && (
          <div className="relative w-full h-[60vh] mb-8">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        )}
        
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-gray-300 font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText 
          value={post.content}
          components={PortableTextComponents}
        />
      </div>

      {/* Author Bio */}
      {post.author.bio && (
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex items-start gap-6">
            {post.author.image && (
              <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                About {post.author.name}
              </h3>
              <div className="text-gray-400">
                <PortableText 
                  value={post.author.bio}
                  components={PortableTextComponents}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}