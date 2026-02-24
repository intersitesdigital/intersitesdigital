/**
 * SEO Utility Functions
 */

export const generateMetaTags = (title, description, image, url) => {
  const baseTitle = 'Intersites Digital';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const baseUrl = 'https://intersitesdigital.in';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const defaultImage = `${baseUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: description || 'Premium Digital Agency & Future SaaS Platform. We help businesses build beautiful, accessible, fast, and secure digital solutions.',
    image: image || defaultImage,
    url: fullUrl,
  };
};

export const generateStructuredData = (type, data) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Intersites Digital',
        url: 'https://intersitesdigital.in',
        logo: 'https://intersitesdigital.in/logo.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-XXXXX-XXXXX',
          contactType: 'Customer Service',
          email: 'contact@intersitesdigital.in',
        },
        sameAs: [
          'https://twitter.com/intersitesdigital',
          'https://linkedin.com/company/intersitesdigital',
        ],
      };
    
    case 'WebSite':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'Intersites Digital',
        url: 'https://intersitesdigital.in',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://intersitesdigital.in/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };
    
    default:
      return baseStructuredData;
  }
};
