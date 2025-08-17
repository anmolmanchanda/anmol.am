import Head from "next/head"
import { siteConfig } from "@/lib/config"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  noindex?: boolean
}

export function SEO({
  title = siteConfig.name,
  description = siteConfig.description,
  image = `${siteConfig.url}/og-image.png`,
  url = siteConfig.url,
  type = "website",
  author = siteConfig.name,
  publishedTime,
  modifiedTime,
  tags = [],
  noindex = false,
}: SEOProps) {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`
  
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : type === "profile" ? "Person" : "WebSite",
    name: fullTitle,
    description,
    url,
    image,
    ...(type === "article" && {
      author: {
        "@type": "Person",
        name: author,
        url: siteConfig.url,
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      keywords: tags.join(", "),
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`,
        },
      },
    }),
    ...(type === "profile" && {
      jobTitle: "Technical Solutions Architect",
      worksFor: {
        "@type": "Organization",
        name: "UN-Habitat",
      },
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.fiverr,
      ],
    }),
    ...(type === "website" && {
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }),
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {tags.length > 0 && <meta name="keywords" content={tags.join(", ")} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph */}
      {type === "article" && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@anmolmanchanda" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0066ff" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://api.github.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Head>
  )
}