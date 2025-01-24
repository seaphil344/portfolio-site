import { PortableTextBlock } from '@portabletext/types'

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  projectImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  longDescription?: PortableTextBlock[];
}

export interface ProjectCardData {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    slug: string;
    excerpt: string;
    author: {
      name: string;
      image?: string;
    };
    tags: string[];
    publishedAt: Date;
}
