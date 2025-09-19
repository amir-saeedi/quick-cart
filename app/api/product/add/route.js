import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Products";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Config Cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "not authorized" })
        }
        const form = await request.formData();
        const files = form.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: "no file uploaded" })
        }

        const results = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "auto" },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )
                    stream.end(buffer)
                })
            })
        )

        const name = form.get('name');
        const description = form.get('description');
        const category = form.get('category');
        const price = form.get('price');
        const offerPrice = form.get('offerPrice');
        const image = results.map(result => result?.secure_url)

        await connectDB();
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image,
            date: Date.now()
        })

        return NextResponse.json({ success: true, message: "Upload successful", newProduct })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
