import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingress Software LLC – Opening Doors to the Digital Economy",
  description: "Architect, Design, Develop Custom Business Technology Solutions. Schedule a meeting to discuss your digital transformation needs.",
  openGraph: {
    title: "Ingress Software LLC – Opening Doors to the Digital Economy",
    description: "Architect, Design, Develop Custom Business Technology Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

