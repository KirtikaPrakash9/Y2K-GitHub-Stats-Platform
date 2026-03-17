import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitWrapped - Analyze Your GitHub Like It's 2003",
  description: "Transform your GitHub profile into a nostalgic, Y2K-styled interactive experience. Get AI-powered insights, stats, and shareable cards.",
  keywords: ["github", "analytics", "stats", "y2k", "developer", "profile"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
