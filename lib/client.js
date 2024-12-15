import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'abfuqm0c',
  dataset: 'production',
  apiVersion: '2024-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) {
    console.warn('urlFor was called with an undefined or null source');
    return '';
  }
  return builder.image(source).url();
};