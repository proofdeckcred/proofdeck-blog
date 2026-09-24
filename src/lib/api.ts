const API_URL = process.env.PYTHON_API_URL || "https://api.proofdeck.app/api";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image?: string;
  author_name: string;
  author_role?: string;
  author_avatar?: string;
  category: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  is_published: boolean;
  published_at: string;
  read_time_minutes: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface SlugEntry {
  slug: string;
  updated_at: string;
}

export interface CategorySummary {
  name: string;
  count: number;
}

// No fake dummy articles. The blog only displays genuine articles published via admin.
const DEFAULT_POSTS: BlogPost[] = [];

export async function fetchPublishedPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<PostsResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page.toString());
  if (params?.limit) query.set("limit", params.limit.toString());
  if (params?.category && params.category !== "All") query.set("category", params.category);
  if (params?.search) query.set("search", params.search);

  try {
    const res = await fetch(`${API_URL}/blog/posts?${query.toString()}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProofDeck-Blog/1.0",
      },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      return {
        posts: Array.isArray(data.posts) ? data.posts : [],
        total: data.total || (data.posts ? data.posts.length : 0),
        page: data.page || 1,
        pages: data.pages || 0,
        has_next: !!data.has_next,
        has_prev: !!data.has_prev,
      };
    }
  } catch (err) {
    console.warn("Backend API not reachable for posts:", err);
  }

  return {
    posts: [],
    total: 0,
    page: 1,
    pages: 0,
    has_next: false,
    has_prev: false,
  };
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blog/posts/${slug}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProofDeck-Blog/1.0",
      },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend API not reachable for slug '${slug}':`, err);
  }

  return null;
}

export async function fetchAllSlugs(): Promise<SlugEntry[]> {
  try {
    const res = await fetch(`${API_URL}/blog/slugs`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProofDeck-Blog/1.0",
      },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn("Backend API not reachable for slugs:", err);
  }

  return [];
}

export async function fetchCategories(): Promise<CategorySummary[]> {
  try {
    const res = await fetch(`${API_URL}/blog/categories`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProofDeck-Blog/1.0",
      },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    // fallback categories if backend is unavailable
  }

  return [
    { name: "General", count: 0 },
    { name: "How to", count: 0 },
    { name: "For devs", count: 0 },
  ];
}
