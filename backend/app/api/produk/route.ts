import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// =======================
// [GET] - Ambil semua data produk
// =======================
export const GET = async () => {
  try {
    const produkList = await prisma.produk.findMany({
      include: { petani: true }, // jika ingin menampilkan relasi petani
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: null,
          status: 200,
        },
        data_produk: produkList,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan server saat mengambil data produk",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};

// =======================
// [POST] - Tambah data produk
// =======================
export const POST = async (request: NextRequest) => {
  try {
    const {
      nama_value,
      deskripsi_value,
      harga_value,
      stok_value,
      petaniId_value,
    } = await request.json();

    // Validasi input
    if (
      !nama_value ||
      !deskripsi_value ||
      harga_value === undefined ||
      stok_value === undefined ||
      petaniId_value === undefined
    ) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Semua field harus diisi",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const hargaNum = Number(harga_value);
    const stokNum = Number(stok_value);
    const petaniIdNum = Number(petaniId_value);

    if (isNaN(hargaNum) || isNaN(stokNum) || isNaN(petaniIdNum)) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Harga, stok, dan petaniId harus berupa angka yang valid",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Cek duplikat berdasarkan nama dan petani
    const existingProduk = await prisma.produk.findFirst({
      where: {
        nama: nama_value,
        petaniId: petaniIdNum,
      },
    });

    if (existingProduk) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Produk dengan nama dan petani yang sama sudah terdaftar",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const saveProduk = await prisma.produk.create({
      data: {
        nama: nama_value,
        deskripsi: deskripsi_value,
        harga: hargaNum,
        stok: stokNum,
        petaniId: petaniIdNum,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data produk berhasil disimpan",
          status: 201,
        },
        data: saveProduk,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan server saat menyimpan produk",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};
