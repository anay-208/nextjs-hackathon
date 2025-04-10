import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lifelog",
  description: "Notion on Steroids", //TODO: Finalize the metadata situation (https://github.com/anay-208/nextjs-hackathon/issues/8)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ inter.className} subpixel-antialiased`}>{children}</body>
    </html>
  );
}
