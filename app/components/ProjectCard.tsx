import Image from 'next/image'
import Link from 'next/link'
import { Github, Globe } from 'lucide-react'
import type { ProjectCardData } from '@/types'

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 
      hover:border-gray-700 transition-all duration-200 transform hover:translate-y-[-2px]">
      <div className="relative h-64 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-200"
        />
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-6">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-6">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Github size={20} />
              <span>View Code</span>
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Globe size={20} />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}