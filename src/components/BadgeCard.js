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

      {/* Palm decorations */}
      <div className="badge-card__palm badge-card__palm--left" aria-hidden="true">🌴</div>
      <div className="badge-card__palm badge-card__palm--right" aria-hidden="true">🌴</div>

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
        <p className="badge-card__builder-title">✦ {builderTitle} ✦</p>
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
