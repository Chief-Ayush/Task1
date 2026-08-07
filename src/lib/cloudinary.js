export function buildCloudinaryImageUrl(cloudName, publicId) {

  if (!cloudName || !publicId) {
    return '';
  }

  if (/^https?:\/\//i.test(publicId)) {
    return publicId;
  }

  // Prepend default folder if it is missing
  const fullPublicId = publicId.includes('/') ? publicId : `hh-goa-badges/${publicId}`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${fullPublicId}`;
}
