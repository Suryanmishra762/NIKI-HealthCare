import React from 'react';
import './SectionHeading.css';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
  id
}) {
  return (
    <div className={`section-heading section-heading-${align} heading-theme-${theme} ${className}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 id={id} className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default SectionHeading;
