import Link from 'next/link';
import { buildCloudinaryImageUrl } from '@/lib/cloudinary';

export async function generateMetadata(props) {
  const params = await props.params;
  const searchParams = (await props.searchParams) || {};
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const encodedId = encodeURIComponent(id);
  const imageUrl = searchParams.image || searchParams.src || buildCloudinaryImageUrl(process.env.CLOUDINARY_CLOUD_NAME, decodeURIComponent(id));
  const pageUrl = `${baseUrl}/card/${encodedId}${imageUrl ? `?image=${encodeURIComponent(imageUrl)}` : ''}`;

  const ogImageUrl = `${baseUrl}/api/og/${encodedId}${imageUrl ? `?src=${encodeURIComponent(imageUrl)}` : ''}`;

  return {
    title: 'My Hacker House Goa Badge | #FrameInGoa',
    description: 'Check out my builder badge from Hacker House Goa 2026! 🌴',
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: 'My Hacker House Goa Badge | #FrameInGoa',
      description: 'Check out my builder badge from Hacker House Goa 2026! 🌴',
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Hacker House Goa Badge',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'My Hacker House Goa Badge | #FrameInGoa',
      description: 'Check out my builder badge from Hacker House Goa 2026! 🌴',
      creator: '@FrameInGoa',
      site: '@FrameInGoa',
      images: [
        {
          url: ogImageUrl,
          alt: 'Hacker House Goa Badge',
        },
      ],
    },
  };
}

export default async function CardPage(props) {
  const params = await props.params;
  const searchParams = (await props.searchParams) || {};
  const { id } = params;
  const decodedId = decodeURIComponent(id);
  const imageUrl = searchParams.image || searchParams.src || buildCloudinaryImageUrl(process.env.CLOUDINARY_CLOUD_NAME, decodedId);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const encodedId = encodeURIComponent(id);
  const pageUrl = `${baseUrl}/card/${encodedId}${imageUrl ? `?image=${encodeURIComponent(imageUrl)}` : ''}`;

  const tweetText = 'Check out my builder badge from Hacker House Goa 2026! 🌴';
  const twitterShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(pageUrl)}&hashtags=FrameInGoa,HackerHouseGoa`;

  return (
    <div className="app">
      <div className="card-page">
        <header className="app__header">
          <h1 className="app__logo">
            HACKER HOUSE GOA
            <span className="app__logo-accent">Frame In Goa</span>
          </h1>
        </header>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="My Hacker House Goa Badge"
            className="card-page__image"
          />
        </div>

        <div className="card-page__actions">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn action-btn--share"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
            </svg>
            Share on X
          </a>
          <Link href="/" className="action-btn action-btn--download">
            🎨 Create Your Own Badge
          </Link>
        </div>
      </div>
    </div>
  );
}
