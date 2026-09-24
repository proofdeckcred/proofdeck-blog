import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  const expectedSecret = process.env.REVALIDATION_SECRET || "proofdeck-revalidate-secret-key-2026";

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
  }

  try {
    // 1. Revalidate the blog index listing
    revalidatePath("/", "page");

    // 2. Revalidate specific article if slug was provided
    if (slug) {
      revalidatePath(`/${slug}`, "page");
    }

    // 3. Revalidate the sitemap
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug: slug || "all",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
