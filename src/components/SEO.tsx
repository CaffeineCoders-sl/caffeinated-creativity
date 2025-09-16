import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
  jsonLd?: object | object[];
}

const SEO: React.FC<SEOProps> = ({ title, description, url, image, keywords = [], jsonLd }) => {
  const siteTitle = 'CaffeineCoders — Custom Software, SaaS & AI Development';
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {url && <link rel="canonical" href={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={metaTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD injection */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
