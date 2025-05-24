import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

//const prisma new prismaclient (pilih yg ketiga)
// buat varialbel prisma
const prisma=new PrismaClient

// buat service "DELETE" (hapus data) tb_user
export const DELETE = async (request:NextRequest, props: {params: Promise<{id:string}> }) => {
    const params = await props.params;
    try
    {


    //Cek apakah id tersedia atau tidak
    const checkId = await prisma.produk.findUnique({
        where: {
            id: Number (params.id),
    }
    })

     // Jika tidak ditemukan
    if (!checkId) {
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


    //buat proses "DELETE"
    const deleteData = await prisma.produk.delete({
        where: {
          id: Number (params.id),
        }
    })

    //tampilkan hasil respon
        return NextResponse.json({
            meta_data: {
                error: 0,
                message: " Data User Berhasil Di Hapus ",
                status: 200
            },
        
        }, {
            status: 200
        })
     }
     catch(error: any)
     {
        //tampilkan hasil respon
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Parameter Slug (ID) Harus Angka ! ",
                status: 400
            },
        }, {
            status: 400
        }) 
     }
}

//buat service "GET" (detail data) tb_user
    
        export const GET = async (request:NextRequest, props: {params: Promise<{id:string}> }) => {
    const params = await props.params;
    //Cek apakah id tersedia atau tidak
    const checkId = await prisma.produk.findUnique({
        where: {
            id: Number (params.id),
        
            }
    })

    // Jika tidak ditemukan
    if (!checkId) {
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
        data_user: checkId
    }, {
        status: 200
    })
}

// buat service "PUT" (ubah data) tb_user
export const PUT = async (request:NextRequest, props: {params: Promise<{id:string}> }) => {
    const params = await props.params;

    //Cek apakah id tersedia atau tidak
    const checkId = await prisma.produk.findUnique({
        where: {
            id: Number (params.id),

            }
    })

    // Jika tidak ditemukan
    if (!checkId) {
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
                petaniId: petaniId_value,
                NOT :{
                    id: Number (params.id),
                }
            }
        })

        //jika username ditemukan
    if(checkUSername.length >= 1) {
        return NextResponse.json({
            meta_data: {
                error: 1,
                message: "Data Username Gagal Di Ubah! Username Sudah Terdaftar",
                status: 404
            },
        }, {
                status: 404
        })
    }

    const deskripsi_salt = genSaltSync(10);
        const deskripsi_result = hashSync(deskripsi_value,deskripsi_salt);
    
        //proses PUT data
        const edit = await prisma.produk.update({
            where: {
                id: Number (params.id),
                },
            data: {
                nama: nama_value,
                deskripsi: deskripsi_value,
                harga: harga_value,
                stok: stok_value,
                petaniId: petaniId_value
            },
        })

    //tampilkan hasil respon
    return NextResponse.json({
        meta_data: {
            error: 0,
            message: "data user berhasil diubah",
            status: 200
        },
    }, {
        status: 200
    })
}