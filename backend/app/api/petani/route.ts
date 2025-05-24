import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//buat variabel prisma
const prisma = new PrismaClient();

// Fungsi service "GET" (ambil semua data petani)
export const GET = async () => {
    const data = await prisma.petani.findMany({});

    if (data.length === 0) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data User Tidak Ditemukan",
                status: 404
            },
        }, {
            status: 404
        });
    }

    return NextResponse.json({
        meta_data: {
            error: 0,
            message: null,
            status: 200
        },
        data_user: data
    }, {
        status: 200
    });
};

// Fungsi service "POST" (tambah data petani)
export const POST = async (request: NextRequest) => {
    const { nama_value, kontak_value, alamat_value, produk_value } = await request.json();

    const checkUSername = await prisma.petani.findMany({
        where: {
            kontak: kontak_value,
            alamat: alamat_value,
            produk: produk_value,
        }
    });

    if (checkUSername.length >= 1) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data Username Gagal Disimpan! Username Sudah Terdaftar",
                status: 404
            },
        }, {
            status: 404
        });
    }

    // Tidak ada proses enkripsi di sini
    const save = await prisma.petani.create({
        data: {
            nama: nama_value,
            kontak: kontak_value, // ← langsung disimpan tanpa hash
            alamat: alamat_value,
            produk: produk_value
        },
    });

    return NextResponse.json({
        meta_data: {
            error: 0,
            message: "Data user berhasil disimpan",
            status: 201
        },
    }, {
        status: 201
    });
};
