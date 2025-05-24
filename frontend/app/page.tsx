"use client";

import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChevronLeft,
  faChevronRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLogout, setShowLogout] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Fungsi logout (dummy)
  const handleLogout = () => {
    alert("Logout berhasil!");
    setShowLogout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-green-700"></h1>
        <div className="relative">
          <span title="Profil">
  <FontAwesomeIcon
    icon={faUserCircle}
    className="text-3xl text-green-700 hover:text-green-900 transition cursor-pointer"
    onClick={() => setShowLogout((prev) => !prev)}
  />
</span>

          {/* Tombol Logout */}
          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute right-0 mt-2 w-24 bg-white border border-green-700 rounded-md shadow-md py-2 text-green-700 font-semibold hover:bg-green-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Konten Utama */}
      <main className="p-6 flex flex-col items-center justify-center">
        <div className="text-4xl md:text-5xl font-extrabold text-green-700 mb-10 drop-shadow-md text-center">
          Selamat Datang di CropMarket Hub 🌾
        </div>

        <div className="w-full max-w-md space-y-6 mb-12">
          <Link href="/petani">
            <div className="bg-white shadow-xl hover:shadow-green-300 transition rounded-2xl p-5 text-center border border-green-200 hover:bg-green-50">
              <h2 className="text-lg font-semibold text-green-700">Kelola Data Petani</h2>
              <p className="text-sm text-gray-500">Tambah, ubah, dan lihat data petani</p>
            </div>
          </Link>

          <Link href="/produk">
            <div className="bg-white shadow-xl hover:shadow-lime-300 transition rounded-2xl p-5 text-center border border-lime-200 hover:bg-lime-50">
              <h2 className="text-lg font-semibold text-lime-700">Kelola Data Produk</h2>
              <p className="text-sm text-gray-500">Manajemen produk hasil pertanian</p>
            </div>
          </Link>
        </div>

        {/* Review Carousel dengan Tombol */}
        <section className="w-full px-4">
          <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">Apa Kata Pelanggan?</h3>

          <div className="relative">
            {/* Tombol Kiri */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-100 hover:bg-green-300 text-green-800 p-2 rounded-full shadow z-10"
              aria-label="Scroll Kiri"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Review List */}
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-hidden scroll-smooth pb-4 mx-10"
            >
              {[{
                name: "Budi Santoso",
                review: "Produk sangat segar dan pengirimannya cepat. Terbaik!",
              },
              {
                name: "Siti Aminah",
                review: "Saya sangat puas dengan kualitas hasil tani dari CropMarket Hub.",
              },
              {
                name: "Andi Wijaya",
                review: "Layanan cepat dan harga bersaing. Pasti langganan!",
              },
              {
                name: "Lestari Dewi",
                review: "Suka banget sama tampilannya yang mudah dipakai dan informatif.",
              }].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-white rounded-xl shadow-lg p-4 border border-green-100 flex-shrink-0"
                >
                  <p className="text-gray-700 italic mb-2">"{item.review}"</p>
                  <p className="text-green-700 font-semibold text-right">- {item.name}</p>
                </div>
              ))}
            </div>

            {/* Tombol Kanan */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-100 hover:bg-green-300 text-green-800 p-2 rounded-full shadow z-10"
              aria-label="Scroll Kanan"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        {/* Kontak Perusahaan */}
        <footer className="mt-16 text-center text-green-700 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>+62 812 3456 7890</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>support@cropmarkethub.id</span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
            <span>Senin - Jumat: 08:00 - 17:00</span>
          </div>

          <div className="flex justify-center space-x-6 mt-4 text-2xl">
            <a href="https://instagram.com/cropmarkethub" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-600 transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com/cropmarkethub" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://facebook.com/cropmarkethub" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-700 transition">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://youtube.com/cropmarkethub" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-600 transition">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
