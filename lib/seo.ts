export const siteConfig = {
  name: 'Cherry IDE',
  description: 'The first IDE with built-in open-source AI models. Code faster with Llama, Mistral, and more—100% local, 100% private.',
  url: 'https://cherryide.com',
  ogImage: 'https://cherryide.com/images/og/home.png',
  links: {
    github: 'https://github.com/cherryide/cherryide',
    twitter: 'https://twitter.com/cherryide',
  },
};

export function generateStructuredData(type: 'website' | 'software') {
  const base = {
    '@context': 'https://schema.org',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  if (type === 'software') {
    return {
      ...base,
      '@type': 'SoftwareApplication',
      operatingSystem: 'Windows, macOS, Linux',
      applicationCategory: 'DeveloperApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
  }

  return {
    ...base,
    '@type': 'WebSite',
  };
}
