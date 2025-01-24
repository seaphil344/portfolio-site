import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-24',
  useCdn: false, // Set to true for production
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}