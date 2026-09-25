import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CredentialSealIcon, DevTerminalIcon, HowToGuideIcon } from "@/components/BlogIcons";
import { fetchPublishedPosts, fetchCategories } from "@/lib/api";
import { Clock, Calendar, ArrowRight, Search, FileText } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  searchParams?: {
    category?: string;
    search?: string;
  };
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const currentCategory = searchParams?.category || "All";
  const searchQuery = searchParams?.search || "";

  const [{ posts, total }, categoryList] = await Promise.all([
    fetchPublishedPosts({
      category: currentCategory,
      search: searchQuery,
      limit: 12,
    }),
    fetchCategories(),
  ]);

  // Default categories in nav: General, How to, For devs
  const defaultCats = ["General", "How to", "For devs"];
  const allCategoryNames = Array.from(
    new Set(["All", ...defaultCats, ...categoryList.map((c) => c.name)])
  );

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  // Clean solid surfaces per category if article has no featured image
  const renderVisualToken = (category: string) => {
    const c = (category || "").toLowerCase();
    if (c.includes("dev")) {
      return (
        <div className="w-full h-44 rounded-2xl bg-[#0B0B12] flex items-center justify-center border border-slate-800 shadow-xs group-hover:scale-[1.01] transition-transform duration-300">
          <DevTerminalIcon className="w-16 h-16" />
        </div>
      );
    }
    if (c.includes("how to")) {
      return (
        <div className="w-full h-44 rounded-2xl bg-[#F7F7FA] flex items-center justify-center border border-[#E7E5F0] shadow-xs group-hover:scale-[1.01] transition-transform duration-300">
          <HowToGuideIcon className="w-16 h-16" />
        </div>
      );
    }
    return (
      <div className="w-full h-44 rounded-2xl bg-[#F7F7FA] flex items-center justify-center border border-[#E7E5F0] shadow-xs group-hover:scale-[1.01] transition-transform duration-300">
        <CredentialSealIcon className="w-16 h-16" />
      </div>
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ProofDeck Blog",
    "url": "https://blog.proofdeck.app",
    "description": "Practical guides, engineering tutorials, and fraud prevention insights for digital verifiable credentials.",
    "publisher": {
      "@type": "Organization",
      "name": "ProofDeck",
      "url": "https://www.proofdeck.app",
      "logo": "https://www.proofdeck.app/logo.png",
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://blog.proofdeck.app/${post.slug}`,
      "datePublished": post.published_at,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author_name,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PublicHeader currentCategory={currentCategory} />

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 pd-dot-grid border-b border-[#E7E5F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B4CF5] bg-indigo-50 border border-indigo-100/80 px-3 py-1 rounded-md">
                  Articles & Insights
                </span>
                {total > 0 && (
                  <span className="text-xs font-medium text-slate-400">
                    {total} published {total === 1 ? "article" : "articles"}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B0B12] tracking-tight leading-[1.12] mb-5">
                Digital Credentialing, Verification & Engineering Guides
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                In-depth technical guides, tutorials, and security analysis on verifiable credentials, fraud prevention, QR code validation, and REST API automation.
              </p>
            </div>

            {/* Category Navigation Bar & Search */}
            <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-200">
              <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {allCategoryNames.map((catName) => {
                  const isCatActive =
                    catName.toLowerCase() === currentCategory.toLowerCase();
                  const href =
                    catName === "All"
                      ? "/"
                      : `/?category=${encodeURIComponent(catName)}`;

                  return (
                    <Link
                      key={catName}
                      href={href}
                      className={`text-sm sm:text-base whitespace-nowrap transition-all pb-2 px-1 relative no-underline ${
                        isCatActive
                          ? "text-[#5B4CF5] font-bold"
                          : "text-slate-500 hover:text-slate-900 font-medium"
                      }`}
                    >
                      {catName}
                      {isCatActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4CF5] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Search Bar */}
              <form action="/" method="GET" className="relative w-full md:w-72">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4CF5]/20 focus:border-[#5B4CF5] transition-all"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                {currentCategory !== "All" && (
                  <input type="hidden" name="category" value={currentCategory} />
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="py-20 text-center max-w-lg mx-auto bg-white rounded-3xl border border-[#E7E5F0] p-8 sm:p-12 shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#5B4CF5] flex items-center justify-center mx-auto mb-5 border border-indigo-100">
                  <FileText size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0B0B12] mb-2 tracking-tight">
                  {searchQuery || currentCategory !== "All"
                    ? "No articles found"
                    : "Articles Coming Soon"}
                </h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  {searchQuery || currentCategory !== "All"
                    ? "No articles matched your search or category filter. Try clearing the filter."
                    : "We are currently drafting in-depth guides, case studies, and engineering resources. Check back soon!"}
                </p>
                {searchQuery || currentCategory !== "All" ? (
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#5B4CF5] hover:bg-[#4433E0] transition-colors no-underline shadow-xs"
                  >
                    View All Articles
                  </Link>
                ) : (
                  <a
                    href="https://www.proofdeck.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#5B4CF5] hover:bg-[#4433E0] transition-colors no-underline shadow-xs"
                  >
                    Explore ProofDeck Platform &rarr;
                  </a>
                )}
              </div>
            ) : (
              <>
                {/* Featured Post Card */}
                {featuredPost && (
                  <div className="mb-14 sm:mb-18">
                    <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Media / Illustration */}
                        <div className="lg:col-span-6 relative">
                          <Link href={`/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl border border-slate-100 shadow-inner group">
                            {featuredPost.featured_image ? (
                              <img
                                src={featuredPost.featured_image}
                                alt={featuredPost.title}
                                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-64 sm:h-80 bg-[#0B0B12] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <CredentialSealIcon className="w-20 h-20 mb-4" />
                                <span className="text-xs font-mono font-semibold text-indigo-300 tracking-wider uppercase">
                                  ProofDeck Official Guide
                                </span>
                              </div>
                            )}
                          </Link>
                        </div>

                        {/* Right: Text & Details */}
                        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
                          <div className="flex items-center gap-3">
                            <CategoryBadge category={featuredPost.category} />
                            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                              <Clock size={12} />
                              {featuredPost.read_time_minutes} min read
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0B12] group-hover:text-[#5B4CF5] transition-colors leading-[1.2]">
                            <Link href={`/${featuredPost.slug}`} className="no-underline text-inherit">
                              {featuredPost.title}
                            </Link>
                          </h2>

                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                            {featuredPost.excerpt}
                          </p>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {featuredPost.author_avatar ? (
                                <img
                                  src={featuredPost.author_avatar}
                                  alt={featuredPost.author_name}
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[#5B4CF5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                  {featuredPost.author_name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">
                                  {featuredPost.author_name}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {new Date(featuredPost.published_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>

                            <Link
                              href={`/${featuredPost.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B4CF5] hover:text-[#4433E0] group-hover:translate-x-0.5 transition-transform no-underline"
                            >
                              Read Guide <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid of Remaining Articles */}
                {gridPosts.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        More from {currentCategory === "All" ? "all categories" : currentCategory}
                      </h3>
                      <span className="text-xs font-medium text-slate-400">
                        {gridPosts.length} {gridPosts.length === 1 ? "article" : "articles"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                      {gridPosts.map((post) => (
                        <article
                          key={post.id}
                          className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-lg hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          {/* Card Top */}
                          <div className="flex items-center justify-between mb-4">
                            <CategoryBadge category={post.category} size="sm" />
                            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                              <Clock size={11} />
                              {post.read_time_minutes} min read
                            </span>
                          </div>

                          {/* Card Title */}
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#5B4CF5] transition-colors mb-2.5 line-clamp-2 leading-snug">
                            <Link href={`/${post.slug}`} className="no-underline text-inherit">
                              {post.title}
                            </Link>
                          </h4>

                          {/* Card Excerpt */}
                          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-6 line-clamp-3 font-normal">
                            {post.excerpt}
                          </p>

                          {/* Card Visual / Thumbnail / SVG token */}
                          <div className="my-auto pb-6">
                            <Link href={`/${post.slug}`} className="block overflow-hidden rounded-2xl no-underline">
                              {post.featured_image ? (
                                <img
                                  src={post.featured_image}
                                  alt={post.title}
                                  className="w-full h-44 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                renderVisualToken(post.category)
                              )}
                            </Link>
                          </div>

                          {/* Card Footer */}
                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-2.5">
                              {post.author_avatar ? (
                                <img
                                  src={post.author_avatar}
                                  alt={post.author_name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-[#5B4CF5] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs">
                                  {post.author_name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-slate-900 text-xs leading-tight">{post.author_name}</p>
                                <p className="text-[11px] text-slate-400">
                                  {new Date(post.published_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <Link
                              href={`/${post.slug}`}
                              className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-[#5B4CF5] flex items-center justify-center transition-colors no-underline"
                              aria-label="Read article"
                            >
                              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
