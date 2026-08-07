function PalmLeaf({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 110C30 90 60 60 100 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Fronds left side */}
      <path d="M30 90C20 75 8 72 5 78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 75C35 57 20 50 15 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 60C50 40 32 32 25 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M75 45C65 23 45 15 38 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 30C80 8 58 0 50 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Fronds right side */}
      <path d="M30 90C38 78 50 80 55 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 75C55 60 68 62 72 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 60C70 45 83 47 88 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M75 45C85 30 98 32 102 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
    </svg>
  );
}

export default function BadgeCard({ photo, name, role, builderTitle, isPreview = false }) {
  const containerStyle = isPreview ? {
    width: '100%',
    height: 'auto',
    aspectRatio: '1080 / 1350',
  } : {};

  return (
    <div
      className={`badge-card ${isPreview ? 'badge-card-preview' : ''}`}
      id="badge-card-render"
      style={containerStyle}
    >
      {/* Background layers */}
      <div className="badge-card__bg" />
      <div className="badge-card__pattern" />
      <div className="badge-card__border-glow" />
      <div className="badge-card__border" />

      {/* Palm decorations - now using custom SVGs */}
      <PalmLeaf className="badge-card__palm-svg badge-card__palm-svg--left" />
      <PalmLeaf className="badge-card__palm-svg badge-card__palm-svg--right" />

      {/* Header */}
      <div className="badge-card__header">
        <div className="badge-card__event-tag">Builder Residency</div>
        <h1 className="badge-card__event-name">HACKER HOUSE</h1>
        <p className="badge-card__event-year">GOA • 2026</p>
      </div>

      {/* Photo */}
      <div className="badge-card__photo-wrapper">
        <div className="badge-card__photo-frame">
          <img
            src={photo}
            alt={`${name}'s photo`}
            className="badge-card__photo"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Info */}
      <div className="badge-card__info">
        <div className="badge-card__builder-title-wrapper">
          <SparkIcon className="badge-card__spark badge-card__spark--left" />
          <p className="badge-card__builder-title">{builderTitle}</p>
          <SparkIcon className="badge-card__spark badge-card__spark--right" />
        </div>
        <h2 className="badge-card__name">{name}</h2>
        <p className="badge-card__role">{role}</p>
      </div>

      {/* Wave */}
      <div className="badge-card__wave" aria-hidden="true">
        <svg viewBox="0 0 1080 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 20C180 0 360 40 540 20C720 0 900 40 1080 20V40H0V20Z" fill="rgba(78,205,196,0.1)" />
        </svg>
      </div>

      {/* Footer */}
      <div className="badge-card__footer">
        <span className="badge-card__hashtag">#FrameInGoa</span>
        <span className="badge-card__url">hackerhousegoa.com</span>
      </div>
    </div>
  );
}
