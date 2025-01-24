import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import ProjectCard from './components/ProjectCard'
import type { Project, ProjectCardData } from '@/types'

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && featured == true] | order(order asc)[0...4] {
        _id,
        _createdAt,
        title,
        description,
        projectImage,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        order
      }
    `)
    return projects?.map(project => ({
      ...project,
      technologies: project.technologies || []
    })) || []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

async function getLatestPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...2] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          image
        },
        tags
      }
    `)
    return (posts || []).map(post => ({
      ...post,
      tags: post.tags || []
    }))
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const latestPosts = await getLatestPosts()

  return (
    <div className="bg-[#0A0A0B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-30" />
        
        <div className="max-w-6xl mx-auto px-4 pt-32 pb-24 relative">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-blue-400">Full-Stack Developer</h2>
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Creating digital experiences that matter
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                I build exceptional digital experiences that combine elegant design
                with powerful functionality. Focused on creating solutions that
                make a difference.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link 
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-lg 
                    hover:bg-blue-600 transition-all duration-200 transform hover:translate-y-[-2px]"
                >
                  View My Work
                  <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-6">
                  <Link 
                    href="https://github.com/yourusername" 
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={24} />
                  </Link>
                  <Link 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={24} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative w-72 h-72 md:w-[32rem] md:h-[32rem]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20" />
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-gray-800">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
              <p className="text-gray-400">Showcase of my latest work and experiments</p>
            </div>
            <Link 
              href="/projects"
              className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Browse all projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={{
                  title: project.title,
                  description: project.description,
                  imageUrl: urlFor(project.projectImage).url(),
                  technologies: project.technologies,
                  githubUrl: project.githubUrl,
                  liveUrl: project.liveUrl,
                } satisfies ProjectCardData}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Insights</h2>
              <p className="text-gray-400">Thoughts on development, design, and technology</p>
            </div>
            <Link 
              href="/blog"
              className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Read all posts
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug.current}`}
                className="group block bg-gray-900 rounded-xl overflow-hidden border border-gray-800 
                  hover:border-gray-700 transition-all duration-200 transform hover:translate-y-[-2px]"
              >
                <div className="p-8">
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
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}