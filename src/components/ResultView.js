'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import BadgeCard from './BadgeCard';

export default function ResultView({ photo, name, role, builderTitle, onReset }) {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [renderReady, setRenderReady] = useState(false);
  const hiddenBadgeRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  // Calculate preview scale to fit the container
  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        const scale = containerWidth / 1080;
        setPreviewScale(scale);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Mark render as ready after mount
  useEffect(() => {
    const timer = setTimeout(() => setRenderReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const waitForPaint = useCallback(() => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }, []);

  const isMobileDevice = useCallback(() => {
    if (typeof navigator === 'undefined') {
      return false;
    }

    const ua = navigator.userAgent || '';
    const mobilePattern = /Android|iPhone|iPad|iPod|Mobile/i;

    if (navigator.userAgentData?.mobile) {
      return true;
    }

    return mobilePattern.test(ua);
  }, []);

  // Generate high-quality image from the hidden full-size badge
  const generateImage = useCallback(async () => {
    const node = hiddenBadgeRef.current;
    if (!node) throw new Error('Badge element not found');

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await waitForPaint();

    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 1,
      cacheBust: true,
      skipAutoScale: true,
      backgroundColor: '#1A1A2E',
      width: 1080,
      height: 1350,
      canvasWidth: 1080,
      canvasHeight: 1350,
      style: {
        width: '1080px',
        height: '1350px',
        backgroundColor: '#1A1A2E',
        position: 'relative',
        left: '0',
        top: '0',
        transform: 'none',
        opacity: '1',
        overflow: 'hidden',
      },
    });
    return dataUrl;
  }, [waitForPaint]);

  // Download handler
  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const dataUrl = await generateImage();
      const link = document.createElement('a');
      link.download = `hacker-house-goa-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setDownloading(false);
    }
  }, [generateImage, name]);

  // Share on X handler
  const handleShare = useCallback(async () => {
    setSharing(true);
    const mobileShare = isMobileDevice();
    const shareWindow = mobileShare ? null : window.open('', '_blank', 'width=550,height=420');

    try {
      const dataUrl = await generateImage();

      // Upload to Cloudinary via our API route
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      // Build share URL — the card page that has OG meta tags
      const baseUrl = window.location.origin;
      const publicId = encodeURIComponent(data.publicId);
      const cardUrl = `${baseUrl}/card/${publicId}?image=${encodeURIComponent(data.url)}`;

      // Build X intent URL
      const tweetText = `Just built my badge at Hacker House Goa! 🌴🚀`;
      const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(cardUrl)}&hashtags=FrameInGoa,HackerHouseGoa`;

      if (mobileShare) {
        window.location.assign(intentUrl);
      } else if (shareWindow) {
        shareWindow.location.href = intentUrl;
        shareWindow.focus();
      } else {
        window.location.assign(intentUrl);
      }
    } catch (err) {
      console.error('Share error:', err);
      if (shareWindow) {
        shareWindow.close();
      }
      alert('Failed to upload badge. Please check your internet connection and try again.');
    } finally {
      setSharing(false);
    }
  }, [generateImage]);

  return (
    <div className="result-view">
      <h2 className="result-view__title">
        Your badge is <span>ready!</span> 🎉
      </h2>
      <p className="result-view__subtitle">Download it or share it with the world</p>

      {/* Visible scaled preview */}
      <div className="result-view__badge-wrapper">
        <div className="result-view__badge-scroll" ref={previewContainerRef}>
          <div
            className="result-view__badge-stage"
            style={{
              transform: `scale(${previewScale})`,
            }}
          >
            <BadgeCard
              photo={photo}
              name={name}
              role={role}
              builderTitle={builderTitle}
              isPreview={false}
            />
          </div>
        </div>
      </div>

      {/* Hidden full-size badge for rendering */}
      <div
        ref={hiddenBadgeRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1080px',
          height: '1350px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <BadgeCard
          photo={photo}
          name={name}
          role={role}
          builderTitle={builderTitle}
          isPreview={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button
          className="action-btn action-btn--download"
          onClick={handleDownload}
          disabled={downloading || !renderReady}
          type="button"
        >
          {downloading ? (
            <>
              <span className="action-btn__spinner" />
              Generating...
            </>
          ) : (
            <>📥 Download Badge</>
          )}
        </button>

        <button
          className="action-btn action-btn--share"
          onClick={handleShare}
          disabled={sharing || !renderReady}
          type="button"
        >
          {sharing ? (
            <>
              <span className="action-btn__spinner" />
              Uploading...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </>
          )}
        </button>

        <button
          className="action-btn action-btn--new"
          onClick={onReset}
          type="button"
        >
          ← Create Another Badge
        </button>
      </div>
    </div>
  );
}
