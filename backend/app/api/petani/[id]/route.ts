import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Service DELETE (hapus data user)
export const DELETE = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    try {
        const checkId = await prisma.petani.findUnique({
            where: {
                id: Number(params.id),
            }
        });

        if (!checkId) {
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

        await prisma.petani.delete({
            where: {
                id: Number(params.id),
            }
        });

        return NextResponse.json({
            meta_data: {
                error: 0,
                message: "Data User Berhasil Dihapus",
                status: 200
            },
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Parameter Slug (ID) Harus Angka!",
                status: 400
            },
        }, {
            status: 400
        });
    }
};

// Service GET (ambil detail data user)
export const GET = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const checkId = await prisma.petani.findUnique({
        where: {
            id: Number(params.id),
        }
    });

    if (!checkId) {
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
        data_user: checkId
    }, {
        status: 200
    });
};

// Service PUT (ubah data user)
export const PUT = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;

    const checkId = await prisma.petani.findUnique({
        where: {
            id: Number(params.id),
        }
    });

    if (!checkId) {
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

    const { nama_value, kontak_value, alamat_value, produk_value } = await request.json();

    const checkUSername = await prisma.petani.findMany({
        where: {
            kontak: kontak_value,
            alamat: alamat_value,
            produk: produk_value,
            NOT: {
                id: Number(params.id),
            }
        }
    });

    if (checkUSername.length >= 1) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data Username Gagal Diubah! Username Sudah Terdaftar",
                status: 404
            },
        }, {
            status: 404
        });
    }

    // Tidak ada enkripsi pada kontak di sini
    const edit = await prisma.petani.update({
        where: {
            id: Number(params.id),
        },
        data: {
            nama: nama_value,
            kontak: kontak_value, // <- langsung simpan tanpa hash
            alamat: alamat_value,
            produk: produk_value
        },
    });

    return NextResponse.json({
        meta_data: {
            error: 0,
            message: "Data User Berhasil Diubah",
            status: 200
        },
    }, {
        status: 200
    });
};
