import { NextRequest, NextResponse } from "next/server";
import { db, portfolio } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { available: false, error: "Username is required" },
        { status: 400 }
      );
    }

    // Validate username format
    const usernameRegex = /^[a-z0-9-]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          available: false,
          error:
            "Username can only contain lowercase letters, numbers, and hyphens",
        },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { available: false, error: "Username must be 3-20 characters" },
        { status: 400 }
      );
    }

    if (username.startsWith("-") || username.endsWith("-")) {
      return NextResponse.json(
        {
          available: false,
          error: "Username cannot start or end with a hyphen",
        },
        { status: 400 }
      );
    }

    // Check reserved usernames
    const reservedUsernames = [
      "admin",
      "api",
      "www",
      "app",
      "dashboard",
      "login",
      "signup",
      "auth",
      "preview",
      "settings",
      "support",
      "help",
      "blog",
      "about",
      "contact",
      "terms",
      "privacy",
    ];

    if (reservedUsernames.includes(username)) {
      return NextResponse.json(
        { available: false, error: "This username is reserved" },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existing = await db
      .select({ id: portfolio.id })
      .from(portfolio)
      .where(eq(portfolio.username, username))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { available: false, error: "Username is already taken" },
        { status: 200 }
      );
    }

    return NextResponse.json({ available: true }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { available: false, error: "Failed to check username" },
      { status: 500 }
    );
  }
}
