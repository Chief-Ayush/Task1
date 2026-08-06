import { Outfit, Inter, Dancing_Script } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Frame In Goa | Hacker House Goa 2026',
  description: 'Create your builder badge for Hacker House Goa 2026. Upload a photo, pick your stack, and get a shareable event badge instantly. 🌴',
  keywords: ['Hacker House Goa', 'badge generator', 'FrameInGoa', 'builder badge', 'developer event'],
  openGraph: {
    title: 'Frame In Goa | Hacker House Goa 2026',
    description: 'Create your builder badge for Hacker House Goa 2026 🌴',
    type: 'website',
    siteName: 'Frame In Goa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frame In Goa | Hacker House Goa 2026',
    description: 'Create your builder badge for Hacker House Goa 2026 🌴',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1A1A2E',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${dancingScript.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {/* Animated background orbs */}
        <div className="bg-orbs" aria-hidden="true">
          <div className="bg-orbs__orb bg-orbs__orb--coral" />
          <div className="bg-orbs__orb bg-orbs__orb--teal" />
          <div className="bg-orbs__orb bg-orbs__orb--gold" />
        </div>
        {children}
      </body>
    </html>
  );
}
