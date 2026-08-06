'use client';

import { useState, useEffect, useCallback } from 'react';
import { roleOptions, getRandomTitle } from '@/lib/builderTitles';

export default function DetailsForm({ onSubmit, onBack }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [builderTitle, setBuilderTitle] = useState('');
  const [titleKey, setTitleKey] = useState(0); // for re-render animation

  // Generate title when role changes
  useEffect(() => {
    if (role) {
      setBuilderTitle(getRandomTitle(role));
      setTitleKey(prev => prev + 1);
    }
  }, [role]);

  const rerollTitle = useCallback(() => {
    if (role) {
      setBuilderTitle(getRandomTitle(role));
      setTitleKey(prev => prev + 1);
    }
  }, [role]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!name.trim() || !role || !builderTitle) return;
    onSubmit({
      name: name.trim(),
      role: roleOptions.find(r => r.value === role)?.label || role,
      roleValue: role,
      builderTitle,
    });
  }, [name, role, builderTitle, onSubmit]);

  const isValid = name.trim().length > 0 && role && builderTitle;

  return (
    <form className="details-form" onSubmit={handleSubmit}>
      <h2 className="details-form__title">Tell us about you ✨</h2>

      <div className="glass-card">
        <div className="form-group">
          <label className="form-group__label" htmlFor="name-input">
            Your Name
          </label>
          <input
            id="name-input"
            className="form-group__input"
            type="text"
            placeholder="e.g. Pratik Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            autoComplete="name"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-group__label" htmlFor="role-select">
            Your Stack / Role
          </label>
          <select
            id="role-select"
            className="form-group__select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>Choose your superpower...</option>
            {roleOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {builderTitle && (
          <div className="builder-title">
            <p className="builder-title__label">Your Builder Title</p>
            <p className="builder-title__text" key={titleKey}>{builderTitle}</p>
            <button
              type="button"
              className="builder-title__reroll"
              onClick={rerollTitle}
              aria-label="Get a new builder title"
            >
              <span className="builder-title__reroll-icon">🎲</span>
              Reroll
            </button>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button
          type="submit"
          className="generate-btn"
          disabled={!isValid}
        >
          Generate Badge 🎨
        </button>
      </div>
    </form>
  );
}
