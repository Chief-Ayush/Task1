'use client';

import { useState, useCallback } from 'react';
import PhotoCapture from '@/components/PhotoCapture';
import DetailsForm from '@/components/DetailsForm';
import ResultView from '@/components/ResultView';

export default function Home() {
  const [step, setStep] = useState(1); // 1: Photo, 2: Details, 3: Result
  const [photo, setPhoto] = useState(null);
  const [details, setDetails] = useState(null);

  const handlePhotoSelected = useCallback((photoData) => {
    setPhoto(photoData);
    setStep(2);
  }, []);

  const handleDetailsSubmit = useCallback((formData) => {
    setDetails(formData);
    setStep(3);
  }, []);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  const handleReset = useCallback(() => {
    setPhoto(null);
    setDetails(null);
    setStep(1);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <h1 className="app__logo">
          HACKER HOUSE GOA
          <span className="app__logo-accent">Frame In Goa</span>
        </h1>
        <p className="app__subtitle">Create your builder badge in seconds</p>
      </header>

      {/* Step Indicators */}
      <div className="app__main">
        <div className="steps" role="navigation" aria-label="Progress">
          <div className={`steps__dot ${step >= 1 ? 'steps__dot--active' : ''} ${step > 1 ? 'steps__dot--completed' : ''}`} />
          <div className={`steps__line ${step >= 2 ? 'steps__line--active' : ''}`} />
          <div className={`steps__dot ${step >= 2 ? 'steps__dot--active' : ''} ${step > 2 ? 'steps__dot--completed' : ''}`} />
          <div className={`steps__line ${step >= 3 ? 'steps__line--active' : ''}`} />
          <div className={`steps__dot ${step >= 3 ? 'steps__dot--active' : ''}`} />
        </div>

        {/* Step Content */}
        {step === 1 && (
          <PhotoCapture onPhotoSelected={handlePhotoSelected} />
        )}

        {step === 2 && (
          <DetailsForm
            onSubmit={handleDetailsSubmit}
            onBack={handleBack}
          />
        )}

        {step === 3 && details && (
          <ResultView
            photo={photo}
            name={details.name}
            role={details.role}
            builderTitle={details.builderTitle}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
