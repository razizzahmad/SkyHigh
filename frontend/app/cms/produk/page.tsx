
//produk/add
"use client";

import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdukPage() {
  // Ambil data produk
  const {
    data: produkData,
    error: produkError,
    mutate: mutateProduk,
  } = useSWR("http://localhost:3001/api/produk", fetcher);

  // Ambil data petani
  const { data: petaniData, error: petaniError } = useSWR(
    "http://localhost:3001/api/petani",
    fetcher
  );

  // Fungsi hapus produk
  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/produk/${id}`);
      mutateProduk(); // refresh data produk setelah hapus
      alert(response.data.meta_data.message);
    } catch (err) {
      alert("Gagal menghapus produk");
    }
  };

  // Loading dan error handling
  if (!produkData || !petaniData) return <p>Loading...</p>;
  if (produkError || petaniError) return <p>Failed to load data</p>;

  // ✅ Perbaikan: Akses ke data_produk
  const produkList = Array.isArray(produkData.data_produk) ? produkData.data_produk : [];
  const petaniList = Array.isArray(petaniData.data_user) ? petaniData.data_user : [];

  // Gabungkan produk dengan data petani berdasarkan petaniId
  const produkDenganPetani = produkList.map((produk: any) => {
    const petani = petaniList.find((p: any) => p.id === produk.petaniId);
    return {
      ...produk,
      petaniNama: petani ? petani.nama : "Tidak ditemukan",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg border border-lime-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-lime-700 text-center mb-8">
          🥕 Data Produk
        </h1>

        <div className="flex justify-end mb-4">
          <Link
            href="/produk/add"
            className="bg-lime-600 hover:bg-lime-700 text-white font-medium px-4 py-2 rounded-xl shadow transition"
          >
            Tambah Produk
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-lime-100 text-lime-800">
              <tr className="text-center font-semibold">
                <th className="py-3">Aksi</th>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Petani ID</th>
                <th>Nama Petani</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {produkData.meta_data?.error === 1 ? (
                <tr>
                  <td colSpan={8} className="text-center text-red-500 py-4">
                    {produkData.meta_data.message}
                  </td>
                </tr>
              ) : (
                produkDenganPetani.map((item: any) => (
                  <tr key={item.id}>
                    <td className="space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-white transition"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded text-white transition"
                        onClick={() => deleteData(item.id)}
                        title="Hapus"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                    <td>
                      <img
                        src="/images/TOMATOS.jpg"
                        alt="Gambar Produk"
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>
                    <td>{item.nama}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.harga}</td>
                    <td>{item.stok}</td>
                    <td>{item.petaniId}</td>
                    <td>{item.petaniNama}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
