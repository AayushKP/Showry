import { NextRequest, NextResponse } from "next/server";
import { db, portfolio } from "@/db";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Fetch the published portfolio
    const portfolioData = await db
      .select({
        username: portfolio.username,
        fullName: portfolio.fullName,
        email: portfolio.email,
        profileImage: portfolio.profileImage,
        title: portfolio.title,
        tagline: portfolio.tagline,
        bio: portfolio.bio,
        skills: portfolio.skills,
        projects: portfolio.projects,
        experience: portfolio.experience,
        education: portfolio.education,
        socialLinks: portfolio.socialLinks,
        theme: portfolio.theme,
      })
      .from(portfolio)
      .where(
        and(eq(portfolio.username, username), eq(portfolio.isPublished, true))
      )
      .limit(1);

    if (portfolioData.length === 0) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ portfolio: portfolioData[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching public portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
