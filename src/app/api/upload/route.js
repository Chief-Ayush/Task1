import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
        },
        { status: 500 }
      );
    }

    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    if (typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid image format. Expected a base64 image data URL.' },
        { status: 400 }
      );
    }

    // Limit image size to ~12MB of base64 text (which is ~8-9MB file size)
    if (image.length > 12 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image payload is too large. Maximum size is 8MB.' },
        { status: 400 }
      );
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'hh-goa-badges',
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
