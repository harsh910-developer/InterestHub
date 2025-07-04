// SEO utility functions

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const updatePageSEO = (seoData: SEOData) => {
  // Update document title
  document.title = seoData.title;

  // Update meta description
  updateMetaTag("description", seoData.description);

  // Update keywords if provided
  if (seoData.keywords) {
    updateMetaTag("keywords", seoData.keywords);
  }

  // Update Open Graph tags
  updateMetaProperty("og:title", seoData.title);
  updateMetaProperty("og:description", seoData.description);

  if (seoData.image) {
    updateMetaProperty("og:image", seoData.image);
  }

  if (seoData.url) {
    updateMetaProperty("og:url", seoData.url);
    updateCanonicalUrl(seoData.url);
  }

  if (seoData.type) {
    updateMetaProperty("og:type", seoData.type);
  }

  // Update Twitter Card tags
  updateMetaName("twitter:title", seoData.title);
  updateMetaName("twitter:description", seoData.description);

  if (seoData.image) {
    updateMetaName("twitter:image", seoData.image);
  }
};

const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement;
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
};

const updateMetaName = (name: string, content: string) => {
  let element = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement;
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
};

const updateCanonicalUrl = (url: string) => {
  // Enforce HTTPS for security
  const secureUrl = url.replace(/^http:/, "https:");

  let element = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement;
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = secureUrl;
};

// Generate structured data for blog posts
export const generateBlogPostStructuredData = (post: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  image?: string;
  url: string;
  category?: string;
  readTime?: string;
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedDate,
    url: post.url,
    publisher: {
      "@type": "Organization",
      name: "BlogCommunity",
      logo: {
        "@type": "ImageObject",
        url: "https://blogcommunity.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image,
        width: 800,
        height: 600,
      },
    }),
    ...(post.category && {
      articleSection: post.category,
      keywords: post.category.toLowerCase(),
    }),
    ...(post.readTime && {
      timeRequired: post.readTime,
    }),
  };

  // Remove existing structured data script
  const existingScript = document.querySelector(
    'script[type="application/ld+json"][data-blog-post]',
  );
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data script
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-blog-post", "true");
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

// Generate sitemap dynamically
export const generateSitemap = (
  pages: Array<{
    url: string;
    lastModified?: string;
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority?: number;
  }>,
) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    ${page.lastModified ? `<lastmod>${page.lastModified}</lastmod>` : ""}
    <changefreq>${page.changeFrequency || "weekly"}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};

// Generate robots.txt
export const generateRobotsTxt = (sitemapUrl: string) => {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;
};

// Generate RSS feed
export const generateRSSFeed = (
  posts: Array<{
    title: string;
    description: string;
    url: string;
    author: string;
    publishedDate: string;
    category?: string;
  }>,
) => {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>BlogCommunity</title>
    <description>Discover Stories that Resonate with You</description>
    <link>https://blogcommunity.com</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts
  .map(
    (post) => `    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${post.url}</link>
      <author>${post.author}</author>
      <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
      ${post.category ? `<category>${post.category}</category>` : ""}
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return rss;
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (type) {
    link.type = type;
  }
  document.head.appendChild(link);
};

// Prefetch resources for next navigation
export const prefetchResource = (href: string) => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
};

// Security utilities
export const enforceHTTPS = () => {
  if (location.protocol !== "https:" && location.hostname !== "localhost") {
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`,
    );
  }
};

// JWT Session Management
export const SessionManager = {
  setToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },

  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  removeToken: () => {
    localStorage.removeItem("auth_token");
  },

  isAuthenticated: (): boolean => {
    const token = SessionManager.getToken();
    if (!token) return false;

    try {
      // Basic JWT validation (in production, verify signature on server)
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },
};
