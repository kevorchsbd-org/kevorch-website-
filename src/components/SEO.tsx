import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object | object[];
}

const DOMAIN = 'https://kevorch.online';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = `${DOMAIN}/favicon.png`,
  structuredData,
}) => {
  const fullCanonical = canonical ? `${DOMAIN}${canonical}` : DOMAIN;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper function to set or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow');
    setLinkTag('canonical', fullCanonical);

    // 3. Open Graph Metadata
    setMetaTag('property', 'og:site_name', 'Kevorch SBD Marketing & Development');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. JSON-LD Structured Data
    const scriptId = 'json-ld-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, fullCanonical, ogType, ogImage, structuredData]);

  return null;
};

export default SEO;
