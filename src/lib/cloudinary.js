export function buildCloudinaryImageUrl(cloudName, publicId) {

  if (!cloudName || !publicId) {
    return '';
  }

  if (/^https?:\/\//i.test(publicId)) {
    return publicId;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
}