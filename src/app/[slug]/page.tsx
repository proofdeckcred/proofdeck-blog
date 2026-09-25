import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { fetchPostBySlug, fetchAllSlugs, fetchPublishedPosts } from "@/lib/api";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2, CheckCircle2 } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.meta_title || `${post.title} | ProofDeck Guide`;
  const description = post.meta_description || post.excerpt;
  const url = post.canonical_url || `https://blog.proofdeck.app/${post.slug}`;
  const image = post.featured_image || "https://www.proofdeck.app/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author_name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@proofdeck",
    },
    other: {
      "geo.region": "NG-LA",
      "geo.placename": "Lagos, Nigeria",
      "geo.position": "6.5244;3.3792",
      "ICBM": "6.5244, 3.3792",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  // Fetch related articles from the same category or latest
  const { posts: relatedPosts } = await fetchPublishedPosts({
    category: post.category,
    limit: 4,
  });
  const filteredRelated = relatedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleUrl = post.canonical_url || `https://blog.proofdeck.app/${post.slug}`;

  // Structured Data (BlogPosting + Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}/#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        "headline": post.title,
        "description": post.excerpt,
        "image": post.featured_image || "https://www.proofdeck.app/og-image.png",
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "mainEntityOfPage": articleUrl,
        "author": {
          "@type": "Person",
          "name": post.author_name,
          "jobTitle": post.author_role || "Credential Specialist",
        },
        "publisher": {
          "@type": "Organization",
          "name": "ProofDeck",
          "url": "https://www.proofdeck.app",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.proofdeck.app/logo.png",
          },
        },
        "articleSection": post.category,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://blog.proofdeck.app",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": post.category,
            "item": `https://blog.proofdeck.app/?category=${encodeURIComponent(post.category)}`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicHeader currentCategory={post.category} />

      <main className="flex-1 py-10 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#5B4CF5] transition-colors no-underline"
            >
              <ArrowLeft size={14} /> Back to Guides & Articles
            </Link>

            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Published in <strong className="text-slate-600 font-semibold">{post.category}</strong>
            </span>
          </div>

          {/* Article Header */}
          <header className="mb-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={post.category} />
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock size={12} />
                {post.read_time_minutes} min read
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar size={12} />
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.16]">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal pt-1">
              {post.excerpt}
            </p>

            {/* Author Card Bar */}
            <div className="pt-6 pb-6 border-t border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {post.author_avatar ? (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#5B4CF5] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {post.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 text-sm">{post.author_name}</p>
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {post.author_role || "ProofDeck Contributor"}
                  </p>
                </div>
              </div>

              {/* CTA prompt in header */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.proofdeck.app/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#5B4CF5] hover:bg-[#4433E0] transition-colors no-underline shadow-xs cursor-pointer"
                >
                  Create Account on ProofDeck &rarr;
                </a>
              </div>
            </div>
          </header>

          {/* Featured Image if present */}
          {post.featured_image && (
            <div className="mb-12 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Article Body using Rich Renderer (Supports YouTube videos, Images, Quotes, Code, Links) */}
          <div className="pt-2 pb-12">
            <ArticleRenderer content={post.content} />
          </div>

          {/* Mid/End Article CTA Card prompting users to continue to ProofDeck to signup */}
          <section className="my-14 p-8 sm:p-10 rounded-3xl bg-[#0B0B12] text-white shadow-xl relative overflow-hidden text-center border border-slate-800">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 bg-white/10 px-3 py-1 rounded-md">
                ProofDeck Credential Platform
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Issue tamper-proof certificates with instant QR verification
              </h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Empower your organization with verifiable digital credentials. Bulk issue via Excel, automate delivery, and add 1-click LinkedIn badges in minutes.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.proofdeck.app/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#5B4CF5] hover:bg-slate-100 text-xs sm:text-sm font-bold no-underline shadow-md transition-transform hover:scale-105 cursor-pointer"
                >
                  Continue to ProofDeck & Open Account <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </section>

          {/* Related Articles Section */}
          {filteredRelated.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Related Articles in {post.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredRelated.map((rel) => (
                  <article
                    key={rel.id}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-2">
                        <CategoryBadge category={rel.category} size="sm" />
                      </div>
                      <h4 className="font-bold text-slate-900 hover:text-[#5B4CF5] text-sm leading-snug mb-2 line-clamp-2">
                        <Link href={`/${rel.slug}`} className="no-underline text-inherit">
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/${rel.slug}`}
                      className="text-xs font-bold text-[#5B4CF5] hover:text-[#4433E0] inline-flex items-center gap-1 no-underline"
                    >
                      Read Guide <ArrowRight size={12} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
