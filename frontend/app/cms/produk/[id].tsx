/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [errorNamavisible, seterrorNamaVisible] = useState(false);
  const [errorUsernamevisible, seterrorUsernameVisible] = useState(false);
  const [errorPasswordvisible, seterrorPasswordVisible] = useState(false);

  const dataNama = useRef<HTMLInputElement>(null);
  const dataUsername = useRef<HTMLInputElement>(null);
  const dataPassword = useRef<HTMLInputElement>(null);

  const DetailData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${id}`);
      if (response.data.meta_data.error == 0) {
        dataNama.current!.value = response.data.data_user.nama;
        dataUsername.current!.value = response.data.data_user.username;
        dataPassword.current!.value = response.data.data_user.password;
      }
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  useEffect(() => {
    DetailData();
  }, []);

  const handleSubmit = async () => {
    const nama = dataNama.current?.value.trim();
    const username = dataUsername.current?.value.trim();
    const password = dataPassword.current?.value.trim();

    seterrorNamaVisible(!nama);
    seterrorUsernameVisible(!username);
    seterrorPasswordVisible(!password);

    if (!nama || !username || !password) return;

    try {
      await axios.put(`http://localhost:3001/api/user/${id}`, {
        nama,
        username,
        password,
      });
      alert("Data berhasil diubah!");
    } catch (error) {
      console.error("Gagal mengubah data:", error);
      alert("Terjadi kesalahan saat mengubah data.");
    }
  };

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama</legend>
        <input
          ref={dataNama}
          type="text"
          className="input w-96"
          placeholder="Isikan Nama User"
        />
        {errorNamavisible && (
          <p className="label text-red-700">Nama User Harus Diisi</p>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username</legend>
        <input
          ref={dataUsername}
          type="text"
          className="input w-96"
          placeholder="Isikan Username"
        />
        {errorUsernamevisible && (
          <p className="label text-red-700">Username Harus Diisi</p>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input
          ref={dataPassword}
          type="password"
          className="input w-96"
          placeholder="Isikan Password"
        />
        {errorPasswordvisible && (
          <p className="label text-red-700">Password Harus Diisi</p>
        )}
      </fieldset>

      <button
        className="btn btn-primary mr-2.5 mt-5 w-24"
        onClick={handleSubmit}
      >
        Ubah
      </button>
      <Link href="/" className="btn btn-soft ml-2.5 mt-5 w-24">
        Batal
      </Link>
    </div>
  );
}