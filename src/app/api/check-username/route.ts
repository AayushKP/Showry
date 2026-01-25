import { NextRequest, NextResponse } from "next/server";
import { db, portfolio } from "@/db";
import { eq, and, ne } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { username, currentUserId } = await request.json();

    if (!username) {
      return NextResponse.json(
        { available: false, error: "Username is required" },
        { status: 400 },
      );
    }

    // Normalize username to lowercase
    const normalizedUsername = username.toLowerCase().trim();

    // Validate username format
    const usernameRegex = /^[a-z0-9-]+$/;
    if (!usernameRegex.test(normalizedUsername)) {
      return NextResponse.json(
        {
          available: false,
          error:
            "Username can only contain lowercase letters, numbers, and hyphens",
        },
        { status: 400 },
      );
    }

    if (normalizedUsername.length < 3 || normalizedUsername.length > 20) {
      return NextResponse.json(
        { available: false, error: "Username must be 3-20 characters" },
        { status: 400 },
      );
    }

    if (
      normalizedUsername.startsWith("-") ||
      normalizedUsername.endsWith("-")
    ) {
      return NextResponse.json(
        {
          available: false,
          error: "Username cannot start or end with a hyphen",
        },
        { status: 400 },
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
      "portfolio",
      "user",
      "users",
      "profile",
      "profiles",
      "account",
      "accounts",
    ];

    if (reservedUsernames.includes(normalizedUsername)) {
      return NextResponse.json(
        { available: false, error: "This username is reserved" },
        { status: 400 },
      );
    }

    // Check if username is already taken (excluding current user if provided)
    let existing;
    if (currentUserId) {
      // Exclude the current user's portfolio when checking
      existing = await db
        .select({ id: portfolio.id, userId: portfolio.userId })
        .from(portfolio)
        .where(
          and(
            eq(portfolio.username, normalizedUsername),
            ne(portfolio.userId, currentUserId),
          ),
        )
        .limit(1);
    } else {
      existing = await db
        .select({ id: portfolio.id })
        .from(portfolio)
        .where(eq(portfolio.username, normalizedUsername))
        .limit(1);
    }

    if (existing.length > 0) {
      return NextResponse.json(
        { available: false, error: "Username is already taken" },
        { status: 200 },
      );
    }

    return NextResponse.json({ available: true }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { available: false, error: "Failed to check username" },
      { status: 500 },
    );
  }
}
