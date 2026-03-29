import React from 'react';
import { Helmet } from 'react-helmet-async';

const BRAND = "The Nation's Eyes";
const BASE_URL = 'https://thenationseyes.com';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  jsonLd?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  jsonLd,
}) => {
  const fullTitle = `${title} | ${BRAND}`;
  const url = `${BASE_URL}${path}`;
  const defaultImage = `${BASE_URL}/og-default.jpg`;
  const ogImage = image || defaultImage;
  const desc = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
