import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET produk by ID
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Parameter ID harus berupa angka yang valid",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const produk = await prisma.produk.findUnique({ where: { id } });

    if (!produk) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data produk tidak ditemukan",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: null,
          status: 200,
        },
        data_produk: produk,
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

// DELETE produk by ID
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Parameter ID harus berupa angka yang valid",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const produk = await prisma.produk.findUnique({ where: { id } });

    if (!produk) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data produk tidak ditemukan",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    await prisma.produk.delete({ where: { id } });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data produk berhasil dihapus",
          status: 200,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan server saat menghapus produk",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};

// PUT update produk by ID
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Parameter ID harus berupa angka yang valid",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const produk = await prisma.produk.findUnique({ where: { id } });

    if (!produk) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data produk tidak ditemukan",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    const {
      nama_value,
      deskripsi_value,
      harga_value,
      stok_value,
      petaniId_value,
    } = await request.json();

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
            message: "Harga, stok, dan petaniId harus berupa angka valid",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const duplicateProduk = await prisma.produk.findFirst({
      where: {
        nama: nama_value,
        petaniId: petaniIdNum,
        NOT: { id },
      },
    });

    if (duplicateProduk) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Produk dengan nama dan petani yang sama sudah ada",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const updatedProduk = await prisma.produk.update({
      where: { id },
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
          message: "Data produk berhasil diubah",
          status: 200,
        },
        data_produk: updatedProduk,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan server saat mengubah produk",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};
