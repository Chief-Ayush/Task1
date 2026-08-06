import { ImageResponse } from 'next/og';
import { buildCloudinaryImageUrl } from '@/lib/cloudinary';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const decodedId = decodeURIComponent(id);
    const requestUrl = new URL(request.url);
    const imageUrl = requestUrl.searchParams.get('src') || buildCloudinaryImageUrl(process.env.CLOUDINARY_CLOUD_NAME, decodedId);

    if (!imageUrl) {
      throw new Error('No badge image URL available');
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)',
            fontFamily: 'sans-serif',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient accents */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(78,205,196,0.2) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 'bold',
              letterSpacing: '4px',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            HACKER HOUSE GOA 2026
          </div>

          {/* Badge image container */}
          <div
            style={{
              display: 'flex',
              width: '380px',
              height: '380px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid rgba(255,217,61,0.6)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Badge"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
              marginTop: '24px',
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B6B', display: 'flex' }}>
              #FrameInGoa
            </span>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
              hackerhousegoa.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
