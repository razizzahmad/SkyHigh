"use client";

import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PetaniPage() {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3001/api/petani`,
    fetcher
  );

  const deleteData = async (id: string) => {
    const response = await axios.delete(`http://localhost:3001/api/petani/${id}`);
    mutate();
    alert(response.data.meta_data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mb-8">
          🌱 Data Petani
        </h1>

        <div>
          {/* buat tombol "tambah data"={} */}
      <section className="text-right">

       {/* <FontAwesomeIcon icon={faPlus} className="text-xs"/> */}
      <Link href="petani/add" className="btn btn-outline btn-primary">Tambah Petani</Link>
      </section>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-green-800">
              <tr className="text-center font-semibold">
                <th className="py-3">Aksi</th>
                <th>Nama</th>
                <th>Kontak</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data?.meta_data?.error === 1 ? (
                <tr>
                  <td colSpan={4} className="text-center text-red-500 py-4">
                    {data.meta_data.message}
                  </td>
                </tr>
              ) : (
                data?.data_user.map((item: any) => (
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
                    <td>{item.nama}</td>
                    <td>{item.kontak}</td>
                    <td>{item.alamat}</td>
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
