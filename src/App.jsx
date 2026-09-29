import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import SectionHeading from './components/SectionHeading';
import SpecialtyCard from './components/SpecialtyCard';
import DoctorCard from './components/DoctorCard';
import DateStrip, { toISODate, formatDateDisplay } from './components/DateStrip';
import AvailabilityResultCard from './components/AvailabilityResultCard';

import { specialties } from './data/specialties';
import { doctors } from './data/doctors';
import { getAvailability, getUpcomingSchedule, isDoctorAvailableToday } from './data/schedules';
import { clinicInfo } from './data/clinicInfo';

import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  Filter,
  Stethoscope, 
  Building2,
  Info,
  CalendarDays,
  CalendarCheck
} from 'lucide-react';
import './App.css';

function App() {
  // ── Doctor Directory Filter State ──
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState('all');

  // ── Availability Search State ──
  const todayISO = toISODate(new Date());
  const [availSpecialty, setAvailSpecialty] = useState('all');
  const [availDate, setAvailDate] = useState(todayISO);

  const filteredDoctors = activeSpecialtyFilter === 'all'
    ? doctors
    : doctors.filter(doc => doc.specialtyId === activeSpecialtyFilter);

  const handleSelectSpecialtyFromCard = (specialtyId) => {
    setActiveSpecialtyFilter(specialtyId);
    const doctorsSection = document.getElementById('doctors');
    if (doctorsSection) {
      doctorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── Schedule-Based Availability Filtering ──
  // getAvailability returns schedule entries matching date + specialty.
  // We join each entry with the full doctor object from doctors.js.
  const availabilityResults = useMemo(() => {
    const entries = getAvailability(availDate, availSpecialty);

    // Group slots by doctorId (a doctor may appear in multiple entries on the same day)
    const grouped = {};
    for (const entry of entries) {
      if (!grouped[entry.doctorId]) {
        grouped[entry.doctorId] = { doctorId: entry.doctorId, specialtyId: entry.specialtyId, slots: [] };
      }
      grouped[entry.doctorId].slots.push(...entry.slots);
    }

    // Join with full doctor objects
    return Object.values(grouped).map(g => {
      const doctor = doctors.find(d => d.id === g.doctorId);
      return { doctor, slots: g.slots };
    }).filter(r => r.doctor); // guard against broken references
  }, [availDate, availSpecialty]);

  // ── Doctor Profile Handler ──
  const handleViewProfile = (doctor) => {
    const upcoming = getUpcomingSchedule(doctor.id);
    const scheduleSummary = upcoming.length > 0
      ? upcoming.map(u => {
          const dateTitle = formatDateDisplay(u.date);
          const slotsList = u.slots.map(s => `• ${s.startTime} – ${s.endTime}`).join('\n');
          return `${dateTitle}\n${slotsList}`;
        }).join('\n\n')
      : 'No scheduled consultation slots in the next 10 days (consultation by prior appointment only).';

    alert(
      `DOCTOR PROFILE — NIKI HEALTHCARE\n` +
      `═════════════════════════════════════════\n` +
      `${doctor.name}\n` +
      `${doctor.title}\n\n` +
      `Specialty: ${doctor.specialty}\n` +
      `Qualifications: ${doctor.qualifications}\n` +
      `Experience: ${doctor.experience}\n` +
      `Consultation Room: ${doctor.room}\n` +
      `Languages: ${doctor.languages ? doctor.languages.join(', ') : 'English'}\n\n` +
      `Upcoming Scheduled Consultation Timings:\n\n` +
      `${scheduleSummary}\n\n` +
      `About Doctor:\n${doctor.bio}\n\n` +
      `Note: Consultation timings are date-specific. Tokens are issued at clinic reception.`
    );
  };

  // ── Separate featured specialty (ENT) from other specialties ──
  const featuredSpecialty = specialties.find(s => s.id === 'ent') || specialties[0];
  const standardSpecialties = specialties.filter(s => s.id !== featuredSpecialty.id);

  return (
    <div className="site-wrapper">
      <Navbar clinicName={clinicInfo.name} />

      <main id="main-content">
        {/* =================================================================
            1. HERO SECTION (Warm White Background)
            Enhanced composition with photographic architectural hero area,
            overlapping information layer, and calm clinical authority.
           ================================================================= */}
        <section id="hero" className="hero-section" aria-labelledby="hero-heading">
          <div className="container hero-container">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow-wrapper">
                <span className="hero-eyebrow">Private Outpatient & Specialty Healthcare</span>
              </div>

              <h1 id="hero-heading" className="hero-title">
                Dedicated Specialist Care and Modern Consultations for Your Family
              </h1>

              <p className="hero-description">
                Experience thoughtful, patient-focused outpatient care led by verified medical specialists in a serene, modern clinical setting. Timely appointments and multidisciplinary coordination under one roof.
              </p>

              <div className="hero-actions">
                <Button href="#doctors" variant="primary" size="lg">
                  Find a Doctor
                </Button>
                <Button href="#specialties" variant="outline" size="lg">
                  View Specialties
                </Button>
              </div>

              {/* Trust & Clinical Feature Indicators */}
              <div className="hero-trust-indicators">
                <div className="trust-indicator-item">
                  <CheckCircle2 size={16} className="trust-indicator-icon" aria-hidden="true" />
                  <span>Credentialed Medical Specialists</span>
                </div>
                <div className="trust-indicator-item">
                  <CheckCircle2 size={16} className="trust-indicator-icon" aria-hidden="true" />
                  <span>Organized In-Clinic Token Queue</span>
                </div>
                <div className="trust-indicator-item">
                  <CheckCircle2 size={16} className="trust-indicator-icon" aria-hidden="true" />
                  <span>Acoustic Private Consultation Suites</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image & Layered Composition */}
            <div className="hero-visual-wrapper">
              <div className="hero-image-frame">
                <img 
                  src="/images/clinic-hero.jpg" 
                  alt="Modern architectural consultation suite and reception lounge at NIKI HealthCare" 
                  className="hero-architectural-img"
                />

                {/* Overlapping Information Layer Card */}
                <div className="hero-floating-card">
                  <div className="floating-card-top">
                    <span className="live-status-dot" aria-hidden="true" />
                    <span className="live-status-text">Open for Outpatient Consultations</span>
                  </div>
                  <div className="floating-card-body">
                    <p className="floating-hours-title">Reception & Consultation Timings</p>
                    <p className="floating-hours-text">Monday – Saturday: 8:00 AM – 8:00 PM</p>
                    <p className="floating-location-text">Plot No. 42, Healthcare Enclave (Placeholder)</p>
                  </div>
                  <div className="floating-card-footer">
                    <a href="#availability" className="floating-link">
                      <span>View Live Doctor Schedule</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. SPECIALTIES PREVIEW (Light Neutral Background)
            Editorial Layout with 1 Large Featured Specialty + Asymmetric Grid
           ================================================================= */}
        <section id="specialties" className="section-padding specialties-section" aria-labelledby="specialties-title">
          <div className="container">
            <SectionHeading
              id="specialties-title"
              eyebrow="Clinical Disciplines"
              title="Comprehensive Medical Specialties"
              description="Our clinic brings together essential outpatient disciplines to deliver coordinated diagnosis, follow-ups, and preventive clinical care."
              align="center"
              theme="light"
            />

            {/* Editorial Asymmetric Specialties Layout */}
            <div className="specialties-editorial-grid">
              {/* Featured Specialty Column */}
              <div className="specialties-featured-col">
                <SpecialtyCard
                  specialty={featuredSpecialty}
                  featured={true}
                  onSelect={handleSelectSpecialtyFromCard}
                />
              </div>

              {/* Smaller Specialties Grid Column */}
              <div className="specialties-standard-grid">
                {standardSpecialties.map((specialty) => (
                  <SpecialtyCard
                    key={specialty.id}
                    specialty={specialty}
                    featured={false}
                    onSelect={handleSelectSpecialtyFromCard}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. DOCTORS PREVIEW (Clean White Background)
            Premium Doctor Cards with Large Image Areas & Controlled Zoom
           ================================================================= */}
        <section id="doctors" className="section-padding doctors-section" aria-labelledby="doctors-title">
          <div className="container">
            <SectionHeading
              id="doctors-title"
              eyebrow="Our Practicing Faculty"
              title="Consult with Dedicated Specialists"
              description="Each physician brings credentialed expertise, structured consultation hours, and clear diagnostic explanations."
              align="center"
              theme="light"
            />

            {/* Specialty Filter Pills */}
            <div className="specialty-filter-bar" role="tablist" aria-label="Filter doctors by specialty">
              <button
                type="button"
                role="tab"
                aria-selected={activeSpecialtyFilter === 'all'}
                className={`filter-pill ${activeSpecialtyFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveSpecialtyFilter('all')}
              >
                All Specialties ({doctors.length})
              </button>
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSpecialtyFilter === spec.id}
                  className={`filter-pill ${activeSpecialtyFilter === spec.id ? 'active' : ''}`}
                  onClick={() => setActiveSpecialtyFilter(spec.id)}
                >
                  {spec.shortName}
                </button>
              ))}
            </div>

            {/* Doctors Grid with Prominent Image Layout */}
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  isAvailableToday={isDoctorAvailableToday(doctor.id)}
                  onSelectDoctor={handleViewProfile}
                />
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="no-doctors-notice">
                <p>No doctors currently found in this specialty category.</p>
                <Button variant="outline" size="sm" onClick={() => setActiveSpecialtyFilter('all')}>
                  Show All Doctors
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* =================================================================
            4. AVAILABILITY — PHASE 2 INTERACTIVE SYSTEM
            Deep Navy Feature Section with Date Strip, Specialty Filter,
            and schedule-driven availability results.
           ================================================================= */}
        <section id="availability" className="section-padding navy-feature-section" aria-labelledby="availability-title">
          <div className="container">
            <div className="navy-section-header">
              <SectionHeading
                id="availability-title"
                eyebrow="Doctor Availability"
                title="Check Consultation Schedules & Timings"
                description="Select a specialty and date to find available doctors. Morning and evening outpatient consultation slots are shown below."
                align="center"
                theme="dark"
              />
            </div>

            {/* ── Search Controls ────────────────────────────── */}
            <div className="avail-controls-panel" role="search" aria-label="Doctor availability lookup">
              {/* Specialty Selector */}
              <div className="avail-control-row">
                <div className="avail-specialty-field">
                  <label htmlFor="avail-specialty-select" className="avail-control-label">
                    <Filter size={14} className="avail-label-icon" aria-hidden="true" />
                    <span>Clinical Specialty</span>
                  </label>
                  <select
                    id="avail-specialty-select"
                    className="avail-select"
                    value={availSpecialty}
                    onChange={(e) => setAvailSpecialty(e.target.value)}
                  >
                    <option value="all">All Specialties</option>
                    {specialties.map(spec => (
                      <option key={spec.id} value={spec.id}>{spec.shortName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Strip */}
              <div className="avail-control-row">
                <div className="avail-date-field">
                  <span className="avail-control-label">
                    <CalendarDays size={14} className="avail-label-icon" aria-hidden="true" />
                    <span>Select Consultation Date</span>
                  </span>
                  <DateStrip
                    selectedDate={availDate}
                    onSelectDate={setAvailDate}
                  />
                </div>
              </div>
            </div>

            {/* ── Results ────────────────────────────────────── */}
            <div className="navy-availability-results">
              <div className="results-header-strip">
                <div className="results-badge-group">
                  <span className="results-dot-pulse" aria-hidden="true" />
                  <span className="results-badge-title">
                    {availabilityResults.length} {availabilityResults.length === 1 ? 'Doctor' : 'Doctors'} available on {formatDateDisplay(availDate)}
                  </span>
                </div>
                <span className="results-note">Tokens issued at clinic reception • Demo data</span>
              </div>

              {/* Result Cards */}
              {availabilityResults.length > 0 && (
                <div className="navy-availability-results-list">
                  {availabilityResults.map((result) => (
                    <AvailabilityResultCard
                      key={result.doctor.id}
                      doctor={result.doctor}
                      slots={result.slots}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              )}

              {/* No Results State */}
              {availabilityResults.length === 0 && (
                <div className="navy-empty-state">
                  <div className="empty-state-icon" aria-hidden="true">
                    <CalendarCheck size={36} />
                  </div>
                  <h4 className="empty-state-title">No Doctors Available</h4>
                  <p className="empty-state-desc">
                    There are currently no doctors scheduled
                    {availSpecialty !== 'all' && ` for ${specialties.find(s => s.id === availSpecialty)?.shortName || 'this specialty'}`}
                    {' '}on {formatDateDisplay(availDate)}.
                  </p>
                  <div className="empty-state-actions">
                    {availSpecialty !== 'all' && (
                      <button
                        type="button"
                        className="btn btn-outline-accent btn-sm"
                        onClick={() => setAvailSpecialty('all')}
                      >
                        Show All Specialties
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-outline btn-sm navy-ghost-btn"
                      onClick={() => setAvailDate(todayISO)}
                    >
                      Back to Today
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Front Desk Token & Info Notice */}
            <div className="navy-notice-card">
              <div className="navy-notice-content">
                <Info size={18} className="navy-notice-icon" aria-hidden="true" />
                <div>
                  <h4 className="navy-notice-title">Front Desk Token & Consultation Information</h4>
                  <p className="navy-notice-text">
                    Consultation tokens are allocated sequentially upon arrival at reception. For urgent outpatient evaluations or direct consultation questions, contact our desk at <strong>+91 XXX XXX XXXX</strong>.
                  </p>
                </div>
              </div>
              <div className="navy-notice-action">
                <Button href="#contact" variant="outline" size="sm" className="navy-desk-btn">
                  Clinic Location & Helpdesk
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. ABOUT / TRUST SECTION (Warm White Background)
            Clean, professional concept overview without unverifiable claims
           ================================================================= */}
        <section id="about" className="section-padding about-section" aria-labelledby="about-title">
          <div className="container">
            <div className="about-grid">
              <div className="about-text-content">
                <SectionHeading
                  id="about-title"
                  eyebrow="Clinic Principles"
                  title="Care Centered Around Patient Dignity & Clinical Discipline"
                  align="left"
                  theme="light"
                />
                <p className="about-paragraph">
                  {clinicInfo.shortAbout}
                </p>
                <p className="about-paragraph">
                  Established to provide a reliable, calm alternative to crowded hospital lobbies, our facility streamlines the outpatient journey. We ensure ample consultation time so every patient receives clear explanations regarding diagnostics, treatments, and lifestyle modifications.
                </p>

                <div className="about-highlights-list">
                  {clinicInfo.trustPillars.map((pillar, idx) => (
                    <div key={idx} className="about-highlight-card">
                      <div className="highlight-icon-box" aria-hidden="true">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h4 className="highlight-title">{pillar.title}</h4>
                        <p className="highlight-description">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-visual-side">
                <div className="clinical-overview-panel">
                  <div className="panel-badge-calm">Clinical Facility Standards</div>
                  <h3 className="panel-subheading">A Serene Environment Designed for Recovery</h3>
                  <p className="panel-body-text">
                    From acoustic consultation chambers to sanitized procedure rooms, every space at NIKI HealthCare is curated for safety, hygiene, and patient privacy.
                  </p>

                  <div className="facility-checklist">
                    <div className="facility-check-item">
                      <CheckCircle2 size={16} className="facility-icon" aria-hidden="true" />
                      <span>HEPA-filtered consultation suites</span>
                    </div>
                    <div className="facility-check-item">
                      <CheckCircle2 size={16} className="facility-icon" aria-hidden="true" />
                      <span>Dedicated minor procedure & dressing suite</span>
                    </div>
                    <div className="facility-check-item">
                      <CheckCircle2 size={16} className="facility-icon" aria-hidden="true" />
                      <span>Comfortable, low-noise waiting lounge</span>
                    </div>
                    <div className="facility-check-item">
                      <CheckCircle2 size={16} className="facility-icon" aria-hidden="true" />
                      <span>On-site specimen collection & pharmacy link</span>
                    </div>
                  </div>

                  <div className="panel-note-box">
                    <p className="note-text">
                      Note: Facility details represent our architectural planning and clinical specifications for Phase 1 presentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            6. CONTACT PREVIEW (Subtle Neutral / Green-Tinted Section)
            Clean contact details with +91 XXX XXX XXXX placeholder format
           ================================================================= */}
        <section id="contact" className="section-padding contact-section" aria-labelledby="contact-title">
          <div className="container">
            <SectionHeading
              id="contact-title"
              eyebrow="Clinic Information"
              title="Location, Hours & Inquiries"
              description="Visit our clinic or contact our outpatient helpdesk for consultation scheduling and directions."
              align="center"
              theme="light"
            />

            <div className="contact-grid">
              {/* Address Card */}
              <div className="contact-card">
                <div className="contact-card-icon" aria-hidden="true">
                  <MapPin size={22} />
                </div>
                <h3 className="contact-card-title">Clinic Address</h3>
                <p className="contact-card-desc">
                  {clinicInfo.contact.addressLine1}<br />
                  {clinicInfo.contact.addressLine2}
                </p>
                <span className="placeholder-tag">Placeholder Information</span>
              </div>

              {/* Working Hours Card */}
              <div className="contact-card">
                <div className="contact-card-icon" aria-hidden="true">
                  <Clock size={22} />
                </div>
                <h3 className="contact-card-title">Consulting Hours</h3>
                <div className="contact-card-desc">
                  <p><strong>{clinicInfo.timings[0].days}</strong></p>
                  <p>{clinicInfo.timings[0].hours}</p>
                  <p style={{ marginTop: '8px' }}><strong>{clinicInfo.timings[1].days}</strong></p>
                  <p>{clinicInfo.timings[1].hours}</p>
                </div>
                <span className="placeholder-tag">Standard Clinic Timings</span>
              </div>

              {/* Telephone & Helpdesk Card */}
              <div className="contact-card">
                <div className="contact-card-icon" aria-hidden="true">
                  <Phone size={22} />
                </div>
                <h3 className="contact-card-title">Contact Helpdesk</h3>
                <div className="contact-card-desc">
                  <p><strong>Reception:</strong> {clinicInfo.contact.phone}</p>
                  <p><strong>Appointment Desk:</strong> {clinicInfo.contact.appointmentDesk}</p>
                  <p style={{ marginTop: '8px' }}><strong>Email:</strong> {clinicInfo.contact.email}</p>
                </div>
                <span className="placeholder-tag">Demo Contact Lines</span>
              </div>
            </div>

            {/* Clear Placeholder Notice Banner */}
            <div className="placeholder-banner">
              <Info size={18} className="banner-icon" aria-hidden="true" />
              <p className="banner-text">
                <strong>Phase 1 Visual Architecture Notice:</strong> This website is currently displaying design foundations and mock clinic data. Real clinician schedules, online token booking, and administrative features will be connected in future development phases.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer clinicInfo={clinicInfo} />
    </div>
  );
}

export default App;
