import { notFound } from "next/navigation";
import { db, portfolio } from "@/db";
import { eq, and } from "drizzle-orm";
import { PortfolioTemplate } from "@/components/portfolio/portfolio-template";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

async function getPortfolioByUsername(username: string) {
  const portfolioData = await db
    .select()
    .from(portfolio)
    .where(
      and(eq(portfolio.username, username), eq(portfolio.isPublished, true))
    )
    .limit(1);

  return portfolioData[0] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const portfolioData = await getPortfolioByUsername(username);

  if (!portfolioData) {
    return {
      title: "Portfolio Not Found",
      description: "This portfolio does not exist or is not published.",
    };
  }

  return {
    title: `${portfolioData.fullName} | Portfolio`,
    description:
      portfolioData.bio?.slice(0, 160) ||
      `${portfolioData.fullName}'s professional portfolio`,
    openGraph: {
      title: `${portfolioData.fullName} | Portfolio`,
      description:
        portfolioData.bio?.slice(0, 160) ||
        `${portfolioData.fullName}'s professional portfolio`,
      type: "website",
      url: `https://${portfolioData.username}.${process.env.NEXT_PUBLIC_DOMAIN}`,
      images: portfolioData.profileImage
        ? [
            {
              url: portfolioData.profileImage,
              width: 400,
              height: 400,
              alt: portfolioData.fullName,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${portfolioData.fullName} | Portfolio`,
      description:
        portfolioData.bio?.slice(0, 160) ||
        `${portfolioData.fullName}'s professional portfolio`,
      images: portfolioData.profileImage ? [portfolioData.profileImage] : [],
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { username } = await params;
  const portfolioData = await getPortfolioByUsername(username);

  if (!portfolioData) {
    notFound();
  }

  return <PortfolioTemplate portfolio={portfolioData} isPreview={false} />;
}
