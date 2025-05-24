import { metadata } from "@/app/layout";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";


//buat variabel prisma
const prisma = new PrismaClient

//buat fungsi untuk service "GET"
export const GET = async () => {
    //prosess "GET" ///////(tampil data) tb_user
    const data = await prisma.produk.findMany({})

    // Jika tidak ditemukan
    if (data.length == 0) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data User Tidak Ditemukan",
                status: 404
            },
        }, {
                status: 404
        })
    }

    //tampilkan hasil respon
    return NextResponse.json({
        meta_data: {
            error: 0,
            message: null,
            status: 200
        },
        data_user: data
    }, {
        status: 200
    })
}

//buat service "POST" tb_user
export const POST = async (request:NextRequest) => {
    //buat variabel object untuk request
    const {nama_value, deskripsi_value, harga_value, stok_value, petaniId_value} = await request.json()

    //cek apakah username sudah pernah dibuat atau belum
    //hasil nya ada dua yaitu ketemu dan tidak jika tidak maka eror
    const checkUSername = await prisma.produk.findMany({
        where:{
            nama: nama_value,    
            deskripsi: deskripsi_value,
                harga: harga_value,
                stok: stok_value,
                petaniId: petaniId_value
        }
    })

    //jika username ditemukan
    if(checkUSername.length >= 1) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data Username Gagal Disimpan! Username Sudah Terdaftar",
                status: 404
            },
        }, {
                status: 404
        })
    }


    const deskripsi_salt = genSaltSync(10);
        const deskripsi_result = hashSync(deskripsi_value,deskripsi_salt);

    //proses POST data
    const save = await prisma.produk.create({
        data: {
            nama: nama_value,
            deskripsi: deskripsi_result,
            harga: harga_value,
            stok: stok_value,
            petaniId: petaniId_value
        },
    })

    //tampilkan hasil respon
    return NextResponse.json({
        meta_data: {
            error: 0,
            message: "data user berhasil disimpan",
            status: 201
        },
    }, {
        status: 201
    })
}