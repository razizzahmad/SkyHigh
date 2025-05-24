// app/petani/layout.tsx

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Halaman Petani",
  description: "Dashboard petani di CropMarket Hub",
};

export default function PetaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-100px)] p-4 max-w-6xl mx-auto">
      {/* Bisa tambah header atau sidebar khusus petani di sini */}

      {children}

      {/* Bisa tambah footer khusus petani di sini */}
    </main>
  );
}
