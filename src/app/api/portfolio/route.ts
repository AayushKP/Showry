import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, portfolio } from "@/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolioData = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.userId, session.user.id))
      .limit(1);

    if (portfolioData.length === 0) {
      return NextResponse.json({ portfolio: null }, { status: 200 });
    }

    return NextResponse.json({ portfolio: portfolioData[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if portfolio already exists
    const existing = await db
      .select({ id: portfolio.id })
      .from(portfolio)
      .where(eq(portfolio.userId, session.user.id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Portfolio already exists" },
        { status: 400 }
      );
    }

    // Generate a unique username from email
    const baseUsername = session.user.email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 15);

    let username = baseUsername;
    let counter = 1;

    // Check for uniqueness and append number if needed
    while (true) {
      const existingUsername = await db
        .select({ id: portfolio.id })
        .from(portfolio)
        .where(eq(portfolio.username, username))
        .limit(1);

      if (existingUsername.length === 0) break;
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create new portfolio
    const newPortfolio = await db
      .insert(portfolio)
      .values({
        userId: session.user.id,
        username,
        fullName: session.user.name || "",
        email: session.user.email,
        profileImage: session.user.image || undefined,
        skills: [],
        projects: [],
        experience: [],
        education: [],
        socialLinks: {},
        isPublished: false,
      })
      .returning();

    return NextResponse.json({ portfolio: newPortfolio[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Remove fields that shouldn't be updated directly
    delete data.id;
    delete data.userId;
    delete data.createdAt;

    // Update the portfolio
    const updatedPortfolio = await db
      .update(portfolio)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(portfolio.userId, session.user.id))
      .returning();

    if (updatedPortfolio.length === 0) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { portfolio: updatedPortfolio[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.delete(portfolio).where(eq(portfolio.userId, session.user.id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
