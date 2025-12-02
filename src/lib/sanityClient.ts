import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  console.warn('Missing Sanity project configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.')
}

export const sanityClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-03-01',
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
    })
  : null


