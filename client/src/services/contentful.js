import { ContentfulClient } from 'react-contentful'

export const contentfulClient = new ContentfulClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
})