'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import ProjectCard from '../components/ProjectCard'
import { Search } from 'lucide-react'

import type { Project, ProjectCardData } from '@/types'

async function getProjects() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      description,
      projectImage,
      technologies,
      githubUrl,
      liveUrl,
      order
    }
  `)
  return projects
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [allTechnologies, setAllTechnologies] = useState<string[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects()
      setProjects(fetchedProjects)
      setFilteredProjects(fetchedProjects)
      
      // Extract unique technologies with null check
      const techs = new Set<string>()
      fetchedProjects.forEach((project: Project) => {
        if (project.technologies && Array.isArray(project.technologies)) {
          project.technologies.forEach(tech => techs.add(tech))
        }
      })
      setAllTechnologies(Array.from(techs).sort())
    }
    
    fetchProjects()
  }, [])

  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTech = 
        selectedTech.length === 0 || 
        selectedTech.every(tech => project.technologies.includes(tech))
      
      return matchesSearch && matchesTech
    })
    
    setFilteredProjects(filtered)
  }, [searchTerm, selectedTech, projects])

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Projects</h1>
        
        {/* Search and Filter Controls */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 
                transition-colors"
            />
          </div>

          {/* Technology Filters */}
          <div>
            <h3 className="text-white font-medium mb-3">Filter by Technology</h3>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTech.includes(tech)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-gray-400 mb-6">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        {(searchTerm || selectedTech.length > 0) && ' matching your filters'}
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project._id}
              project={{
                title: project.title,
                description: project.description,
                imageUrl: urlFor(project.projectImage).url(),
                technologies: project.technologies,
                githubUrl: project.githubUrl,
                liveUrl: project.liveUrl,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedTech([])
            }}
            className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}