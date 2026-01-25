import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });
      clearTimeout(timeoutId);

      const html = await response.text();

      // Helper to find content of meta tags
      const getMetaContent = (propertyRegex: RegExp, nameRegex: RegExp) => {
        // Search for <meta ... property="..." content="..." > or <meta ... name="..." content="..." >
        // We match the whole tag first
        const metaTagRegex = /<meta[^>]+>/gi;
        let match;
        while ((match = metaTagRegex.exec(html)) !== null) {
          const tag = match[0];
          // Check if it matches our property or name
          if (propertyRegex.test(tag) || nameRegex.test(tag)) {
            // Extract content
            const contentMatch = tag.match(/content=["']([^"']+)["']/i);
            if (contentMatch && contentMatch[1]) return contentMatch[1];
          }
        }
        return null;
      };

      const getImage = () => {
        // og:image, twitter:image, or item/prop image
        const val = getMetaContent(
          /property=["']og:image["']/i,
          /name=["']twitter:image["']/i,
        );
        if (val) return val;
        // scan for other image links if needed, but meta is best
        return null;
      };

      return NextResponse.json({
        image: getImage(),
        title:
          getMetaContent(/property=["']og:title["']/i, /name=["']title["']/i) ||
          "",
        description:
          getMetaContent(
            /property=["']og:description["']/i,
            /name=["']description["']/i,
          ) || "",
      });
    } catch (fetchError) {
      console.error("Error fetching URL:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch URL content" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
