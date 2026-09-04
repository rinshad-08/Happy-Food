import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";
import SmoothScroll from "../components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Food Products",
  description: "Premium quality jams, peanut butter, and pickles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <SmoothScroll>
          <SplashScreen />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
