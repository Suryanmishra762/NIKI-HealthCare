import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import './AvailabilityResultCard.css';

/**
 * AvailabilityResultCard
 *
 * Displays a single doctor's availability for a given date inside the
 * navy availability section.  Supports multiple time-slot rendering.
 *
 * Props:
 *   doctor       – full doctor object from doctors.js (single source of truth)
 *   slots        – array of { startTime, endTime, status } from schedules.js
 *   onViewProfile – callback(doctor)
 */
export function AvailabilityResultCard({ doctor, slots, onViewProfile }) {
  return (
    <article className="avail-result-card">
      {/* Doctor Portrait */}
      <div className="avail-result-image">
        {doctor.photoUrl ? (
          <img
            src={doctor.photoUrl}
            alt={`Portrait of ${doctor.name}`}
            className="avail-result-photo"
            loading="lazy"
          />
        ) : (
          <div className="avail-result-fallback">
            <span className="avail-result-initials">{doctor.avatarPlaceholder || 'DR'}</span>
          </div>
        )}
      </div>

      {/* Details — all from doctors.js */}
      <div className="avail-result-body">
        <div className="avail-result-header">
          <div>
            <span className="avail-result-specialty">{doctor.specialty}</span>
            <h4 className="avail-result-name">{doctor.name}</h4>
            <p className="avail-result-qualifications">{doctor.qualifications}</p>
          </div>
          <span className="avail-result-experience">{doctor.experience}</span>
        </div>

        {/* Consultation Room — from doctor.room */}
        <div className="avail-result-room-strip">
          <MapPin size={13} className="avail-slot-icon" aria-hidden="true" />
          <span className="avail-room-text">{doctor.room}</span>
        </div>

        {/* Time Slots — from schedules.js */}
        <div className="avail-result-slots">
          {slots.map((slot, idx) => (
            <div key={idx} className="avail-slot-row">
              <div className="avail-slot-status-group">
                <span className={`avail-slot-dot status-${slot.status}`} aria-hidden="true" />
                <span className={`avail-slot-label status-${slot.status}`}>
                  {slot.status === 'available' ? 'Available' : 'In Consultation'}
                </span>
              </div>
              <div className="avail-slot-time-group">
                <Clock size={13} className="avail-slot-icon" aria-hidden="true" />
                <span className="avail-slot-time">{slot.startTime} – {slot.endTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Profile */}
        <div className="avail-result-action">
          <button
            type="button"
            className="avail-profile-link"
            onClick={() => onViewProfile && onViewProfile(doctor)}
          >
            <span>View Profile</span>
            <ArrowRight size={14} className="avail-profile-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default AvailabilityResultCard;
