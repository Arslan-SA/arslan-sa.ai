import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arslan SA | Developer Portfolio",
  description:
    "Data Science student at IIT Madras. Machine Learning enthusiast, Python developer, and AI builder. Explore my VS Code-inspired portfolio.",
  keywords: [
    "Arslan",
    "Data Science",
    "Machine Learning",
    "Python",
    "Portfolio",
    "Developer",
    "IIT Madras",
  ],
  openGraph: {
    title: "Arslan SA | Developer Portfolio",
    description:
      "Data Science student at IIT Madras. Explore my VS Code-inspired developer portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
