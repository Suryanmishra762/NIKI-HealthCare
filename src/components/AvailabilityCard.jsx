import React from 'react';
import { Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import './AvailabilityCard.css';

export function AvailabilityCard({ item, variant = 'light' }) {
  const isAvailable = item.statusType === 'available';

  return (
    <div className={`availability-card card-variant-${variant} status-${item.statusType}`}>
      <div className="avail-card-header">
        <div className="avail-doctor-info">
          <h4 className="avail-doc-name">{item.doctorName}</h4>
          <span className="avail-specialty">{item.specialty}</span>
        </div>

        <span className={`avail-status-pill status-${item.statusType}`}>
          <span className="status-dot" aria-hidden="true" />
          <span>{item.status}</span>
        </span>
      </div>

      <div className="avail-card-details">
        <div className="avail-detail-row">
          <Clock size={14} className="avail-icon" aria-hidden="true" />
          <span className="avail-time">{item.shiftTime}</span>
        </div>

        <div className="avail-detail-row">
          <MapPin size={14} className="avail-icon" aria-hidden="true" />
          <span className="avail-room">{item.room}</span>
        </div>
      </div>

      {item.tokenStatus && (
        <div className="avail-footer-note">
          <span className="avail-note-text">{item.tokenStatus}</span>
        </div>
      )}
    </div>
  );
}

export default AvailabilityCard;
