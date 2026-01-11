import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, portfolio } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { publish } = await request.json();

    // Get the portfolio
    const portfolioData = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.userId, session.user.id))
      .limit(1);

    if (portfolioData.length === 0) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    const userPortfolio = portfolioData[0];

    // If publishing, validate required fields
    if (publish) {
      const errors: string[] = [];

      if (!userPortfolio.fullName?.trim()) {
        errors.push("Full name is required");
      }

      if (!userPortfolio.username?.trim()) {
        errors.push("Username is required");
      }

      if (errors.length > 0) {
        return NextResponse.json(
          { error: "Validation failed", errors },
          { status: 400 }
        );
      }
    }

    // Update publish status
    const updatedPortfolio = await db
      .update(portfolio)
      .set({
        isPublished: publish,
        updatedAt: new Date(),
      })
      .where(eq(portfolio.userId, session.user.id))
      .returning();

    const subdomain = `${updatedPortfolio[0].username}.${
      process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000"
    }`;

    return NextResponse.json(
      {
        success: true,
        isPublished: publish,
        subdomain: publish ? subdomain : null,
        url: publish ? `https://${subdomain}` : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update publish status" },
      { status: 500 }
    );
  }
}
