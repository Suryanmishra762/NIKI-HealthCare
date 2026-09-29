import React from 'react';
import { Plus, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import './Footer.css';

export function Footer({ clinicInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Clinic Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <div className="footer-logo" aria-hidden="true">
                <Plus size={18} strokeWidth={3} />
              </div>
              <span className="footer-brand-title">NIKI HealthCare</span>
            </div>
            <p className="footer-tagline">
              Modern outpatient clinic dedicated to multidisciplinary medical excellence, patient safety, and compassionate care.
            </p>
            <div className="footer-disclaimer-pill">
              <ShieldCheck size={14} className="disclaimer-icon" aria-hidden="true" />
              <span>Phase 1 Design Preview • Mock Data</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero" className="footer-link">Home Overview</a></li>
              <li><a href="#specialties" className="footer-link">Medical Specialties</a></li>
              <li><a href="#doctors" className="footer-link">Doctor Directory</a></li>
              <li><a href="#availability" className="footer-link">Daily Availability</a></li>
              <li><a href="#about" className="footer-link">About NIKI HealthCare</a></li>
              <li><a href="#contact" className="footer-link">Contact & Location</a></li>
            </ul>
          </div>

          {/* Clinical Specialties */}
          <div className="footer-col">
            <h4 className="footer-heading">Specialties</h4>
            <ul className="footer-links">
              <li><a href="#specialties" className="footer-link">ENT (Ear, Nose & Throat)</a></li>
              <li><a href="#specialties" className="footer-link">Dermatology & Skin</a></li>
              <li><a href="#specialties" className="footer-link">Cardiology Consultations</a></li>
              <li><a href="#specialties" className="footer-link">Orthopedics & Joint Care</a></li>
              <li><a href="#specialties" className="footer-link">Pediatrics & Child Health</a></li>
              <li><a href="#specialties" className="footer-link">General & Internal Medicine</a></li>
            </ul>
          </div>

          {/* Contact & Hours Placeholder */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Clinic Contact (Placeholder)</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" aria-hidden="true" />
                <span>{clinicInfo.contact.addressLine1}, {clinicInfo.contact.addressLine2}</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" aria-hidden="true" />
                <span>Helpdesk: {clinicInfo.contact.phone}</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" aria-hidden="true" />
                <span>{clinicInfo.contact.email}</span>
              </li>
              <li className="footer-contact-item">
                <Clock size={16} className="footer-contact-icon" aria-hidden="true" />
                <div>
                  <p>{clinicInfo.timings[0].days}: {clinicInfo.timings[0].hours}</p>
                  <p className="footer-subtext">{clinicInfo.timings[1].days}: {clinicInfo.timings[1].hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} NIKI HealthCare. All rights reserved. Developed for private healthcare operations.
          </p>
          <div className="footer-legal">
            <span className="footer-notice">
              Notice: All clinician schedules, room designations, and contact numbers displayed are demonstration placeholders for Phase 1.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
