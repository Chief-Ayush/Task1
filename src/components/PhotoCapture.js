'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export default function PhotoCapture({ onPhotoSelected }) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'camera'
  const [dragOver, setDragOver] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [cameraError, setCameraError] = useState(null);
  const [preview, setPreview] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Start camera
  const startCamera = useCallback(async (facing) => {
    setCameraError(null);
    stopCamera();

    // Check if mediaDevices API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API is not supported in this browser. Please try uploading a photo instead.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      if (err.name === 'OverconstrainedError') {
        try {
          const fallback = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = fallback;
          if (videoRef.current) videoRef.current.srcObject = fallback;
          return;
        } catch {
          // fall through
        }
      }
      setCameraError(err.name === 'NotAllowedError'
        ? 'Camera access denied. Please allow camera permissions.'
        : 'Could not access camera. Try uploading a photo instead.');
    }
  }, [stopCamera]);

  // Open camera mode
  const openCamera = useCallback(() => {
    setMode('camera');
    setPreview(null);
    startCamera(facingMode);
  }, [facingMode, startCamera]);

  // Switch camera
  const switchCamera = useCallback(() => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    startCamera(newMode);
  }, [facingMode, startCamera]);

  // Capture photo from video
  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');

    // Capture at video's native resolution, fallback if zero
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 480;
    const size = Math.min(videoWidth, videoHeight);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    // Center crop
    const sx = (videoWidth - size) / 2;
    const sy = (videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreview(dataUrl);
    stopCamera();
    setMode('preview');
  }, [stopCamera]);

  // Close camera
  const closeCamera = useCallback(() => {
    stopCamera();
    setMode('upload');
  }, [stopCamera]);

  // Handle file selection
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setMode('preview');
    };
    reader.readAsDataURL(file);
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  }, [handleFile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // Change photo
  const changePhoto = useCallback(() => {
    setPreview(null);
    setMode('upload');
  }, []);

  // Confirm and pass to parent
  const confirmPhoto = useCallback(() => {
    if (preview) {
      onPhotoSelected(preview);
    }
  }, [preview, onPhotoSelected]);

  return (
    <div className="photo-capture">
      <h2 className="photo-capture__title">
        <span>📸 Your Photo</span>
      </h2>

      {mode === 'upload' && (
        <>
          <div
            className={`upload-zone glass-card ${dragOver ? 'upload-zone--dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="upload-zone__icon">🌴</span>
            <p className="upload-zone__text">Drop your photo here</p>
            <p className="upload-zone__hint">or tap to browse • JPG, PNG</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="upload-zone__input"
              onChange={handleInputChange}
              aria-label="Upload photo"
            />
          </div>

          <div className="divider">
            <span className="divider__line" />
            <span className="divider__text">or</span>
            <span className="divider__line" />
          </div>

          <button className="camera-btn" onClick={openCamera} type="button">
            <span className="camera-btn__icon">📷</span>
            Take a Photo
          </button>
        </>
      )}

      {mode === 'camera' && (
        <div className="viewfinder">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="viewfinder__video"
          />
          {cameraError ? (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <div>
                <p style={{ color: 'var(--coral)', marginBottom: '1rem' }}>{cameraError}</p>
                <button className="back-btn" onClick={closeCamera} type="button">Go Back</button>
              </div>
            </div>
          ) : (
            <div className="viewfinder__controls">
              <button className="viewfinder__close" onClick={closeCamera} type="button" aria-label="Close camera">
                ✕
              </button>
              <button className="viewfinder__shutter" onClick={capturePhoto} type="button" aria-label="Take photo" />
              <button className="viewfinder__switch" onClick={switchCamera} type="button" aria-label="Switch camera">
                🔄
              </button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}

      {mode === 'preview' && preview && (
        <>
          <div className="photo-preview">
            <img src={preview} alt="Your photo" className="photo-preview__img" />
            <button className="photo-preview__change" onClick={changePhoto} type="button">
              Change Photo
            </button>
          </div>
          <button className="continue-btn" onClick={confirmPhoto} type="button">
            Continue →
          </button>
        </>
      )}
    </div>
  );
}
