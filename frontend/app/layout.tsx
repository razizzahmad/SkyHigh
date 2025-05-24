import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CropMarket Hub",
  description: "Platform marketplace untuk hasil pertanian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col items-center">
    <Image 
      src="/images/logo1.png" 
      width={90} 
      height={90} 
      alt="Logo CropMarket Hub" 
      priority 
    />
    <h1 className="text-2xl font-bold text-green-700 mt-2">CropMarket Hub</h1>
  </div>
</header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-100px)]">{children}</main>

        {/* Footer */}
        <footer className="bg-green-50 border-t text-sm text-gray-600 text-center py-4 mt-10">
          Copyright &copy; 2025 - <span className="font-medium">CropMarket Hub</span>
        </footer>
      </body>
    </html>
  );
}
