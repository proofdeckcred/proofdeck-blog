import { MetadataRoute } from "next";
import { fetchAllSlugs } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.proofdeck.app";
  const slugs = await fetchAllSlugs();

  const postsSitemap: MetadataRoute.Sitemap = slugs.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...postsSitemap,
  ];
}
