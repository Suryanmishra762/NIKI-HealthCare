import React from 'react';
import { 
  Ear, 
  Sparkles, 
  HeartPulse, 
  Activity, 
  Baby, 
  Stethoscope, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import './SpecialtyCard.css';

const ICON_MAP = {
  Ear: Ear,
  Sparkles: Sparkles,
  HeartPulse: HeartPulse,
  Activity: Activity,
  Baby: Baby,
  Stethoscope: Stethoscope
};

export function SpecialtyCard({ specialty, featured = false, onSelect }) {
  const IconComponent = ICON_MAP[specialty.iconName] || Stethoscope;

  if (featured) {
    return (
      <article className="specialty-card specialty-card-featured">
        <div className="featured-banner-strip">
          <span className="featured-eyebrow-pill">Featured Clinical Wing</span>
          <span className="featured-availability-text">Daily Outpatient Clinics</span>
        </div>

        <div className="featured-body">
          <div className="featured-icon-row">
            <div className="specialty-icon-wrapper featured-icon-box" aria-hidden="true">
              <IconComponent size={26} className="specialty-icon" />
            </div>
            <div className="featured-header-text">
              <h3 className="featured-specialty-name">{specialty.name}</h3>
              <span className="featured-specialists-count">{specialty.consultantCount} Dedicated Consultants</span>
            </div>
          </div>

          <p className="featured-specialty-desc">{specialty.description}</p>

          <div className="featured-treatments-container">
            <span className="treatments-header-label">Focus Areas & In-Clinic Diagnostic Care:</span>
            <div className="featured-treatment-tags">
              {specialty.commonTreatments && specialty.commonTreatments.map((treatment, idx) => (
                <span key={idx} className="featured-tag">
                  <CheckCircle2 size={13} className="tag-check" aria-hidden="true" />
                  <span>{treatment}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="featured-card-action">
            <a 
              href="#doctors" 
              className="featured-cta-link"
              onClick={() => onSelect && onSelect(specialty.id)}
            >
              <span>Consult {specialty.shortName} Specialists</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="specialty-card specialty-card-standard">
      <div className="specialty-header">
        <div className="specialty-icon-wrapper" aria-hidden="true">
          <IconComponent size={20} className="specialty-icon" />
        </div>
        {specialty.consultantCount && (
          <span className="specialty-consultants-badge">
            {specialty.consultantCount} Doctors
          </span>
        )}
      </div>

      <h3 className="specialty-name">{specialty.name}</h3>
      <p className="specialty-desc">{specialty.description}</p>

      {specialty.commonTreatments && (
        <ul className="specialty-treatments" aria-label="Key treatment areas">
          {specialty.commonTreatments.slice(0, 2).map((treatment, idx) => (
            <li key={idx} className="specialty-treatment-item">
              <span className="treatment-dot" aria-hidden="true" />
              <span>{treatment}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="specialty-footer">
        <a 
          href="#doctors" 
          className="specialty-link"
          onClick={() => onSelect && onSelect(specialty.id)}
        >
          <span>Find doctors</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default SpecialtyCard;
