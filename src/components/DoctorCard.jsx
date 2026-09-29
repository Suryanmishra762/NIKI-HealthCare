import React from 'react';
import { ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
import './DoctorCard.css';

export function DoctorCard({ doctor, isAvailableToday, onSelectDoctor }) {
  const isAvailable = typeof isAvailableToday === 'boolean'
    ? isAvailableToday
    : Boolean(doctor.isAvailableToday);

  const handleProfileClick = () => {
    if (onSelectDoctor) {
      onSelectDoctor(doctor);
    } else {
      alert(
        `Doctor Profile Preview:\n\n` +
        `${doctor.name}\n${doctor.title}\n` +
        `Specialty: ${doctor.specialty}\n` +
        `Qualifications: ${doctor.qualifications}\n` +
        `Experience: ${doctor.experience}\n` +
        `Consultation Room: ${doctor.room}\n\n` +
        `Note: Consultation timings depend on the selected date. Check the Availability section for schedules.`
      );
    }
  };

  return (
    <article className="doctor-card" onClick={handleProfileClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleProfileClick()}>
      {/* Prominent Doctor Image Container */}
      <div className="doctor-image-container">
        {doctor.photoUrl ? (
          <img 
            src={doctor.photoUrl} 
            alt={`Portrait of ${doctor.name}`} 
            className="doctor-image"
            loading="lazy"
          />
        ) : (
          <div className="doctor-image-fallback">
            <div className="fallback-monogram-circle">
              <span className="fallback-initials">{doctor.avatarPlaceholder || 'DR'}</span>
            </div>
            <div className="fallback-watermark" aria-hidden="true">
              <Stethoscope size={64} strokeWidth={1} />
            </div>
          </div>
        )}

        {/* Status indicator on image */}
        {isAvailable ? (
          <span className="doctor-availability-badge available">
            <span className="availability-dot" aria-hidden="true" />
            <span>Available Today</span>
          </span>
        ) : (
          <span className="doctor-availability-badge scheduled">
            <span className="availability-dot scheduled-dot" aria-hidden="true" />
            <span>By Appointment</span>
          </span>
        )}
      </div>

      {/* Doctor Editorial Info */}
      <div className="doctor-info-panel">
        <div className="doctor-specialty-row">
          <span className="doctor-specialty-label">{doctor.specialty}</span>
          <span className="doctor-experience-tag">{doctor.experience}</span>
        </div>

        <h3 className="doctor-card-name">{doctor.name}</h3>
        <p className="doctor-card-qualifications">{doctor.qualifications}</p>
        <p className="doctor-card-title">{doctor.title}</p>

        <div className="doctor-card-bottom">
          <span className="doctor-view-profile">
            <span>View Profile</span>
            <ArrowRight size={14} className="profile-arrow" aria-hidden="true" />
          </span>
          <span className="doctor-room-indicator">{doctor.room}</span>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
