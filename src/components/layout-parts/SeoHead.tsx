// src/components/layout-parts/SeoHead.tsx
import Head from 'next/head';
import React from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords = 'ERP, Falcon ERP, Middle East, Business Software, Finance, Operations, Logistics, Manufacturing, Intelligence, Trading, Manufacturing, Construction, Automotive, Consultancy, UAE, Saudi Arabia, Qatar, Oman',
  ogImage = '/images/og-image.jpg', // Default Open Graph image
  ogUrl = 'https://www.falconerp.com', // Replace with your actual base URL
}) => {
  return (
    <Head>
      <title>{title} | Falcon ERP</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={`${title} | Falcon ERP`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={`${title} | Falcon ERP`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Head>
  );
};

export default SeoHead;
