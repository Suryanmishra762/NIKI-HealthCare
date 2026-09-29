import React, { useState, useEffect } from 'react';
import { Menu, X, Plus, Phone } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

export function Navbar({ clinicName = 'NIKI HealthCare' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Clinical Strip for Hours & Emergency */}
      <div className="navbar-topbar">
        <div className="container topbar-container">
          <div className="topbar-info">
            <span className="topbar-badge">Clinic Hours</span>
            <span className="topbar-text">Mon - Sat: 8:00 AM – 8:00 PM</span>
          </div>
          <div className="topbar-contact">
            <Phone size={13} className="topbar-icon" aria-hidden="true" />
            <span className="topbar-text">Helpdesk (Placeholder): +91 XXX XXX XXXX</span>
          </div>
        </div>
      </div>

      <nav className="navbar-main" aria-label="Main Navigation">
        <div className="container navbar-container">
          {/* Brand Monogram & Name */}
          <a href="#hero" className="navbar-brand" onClick={closeMenu} aria-label={`${clinicName} Homepage`}>
            <div className="brand-logo" aria-hidden="true">
              <span className="brand-cross">
                <Plus size={20} strokeWidth={3} />
              </span>
            </div>
            <div className="brand-text">
              <span className="brand-title">NIKI</span>
              <span className="brand-subtitle">HealthCare</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-desktop">
            <li>
              <a href="#hero" className="nav-link">Home</a>
            </li>
            <li>
              <a href="#specialties" className="nav-link">Specialties</a>
            </li>
            <li>
              <a href="#doctors" className="nav-link">Doctors</a>
            </li>
            <li>
              <a href="#availability" className="nav-link">Availability</a>
            </li>
            <li>
              <a href="#about" className="nav-link">About</a>
            </li>
            <li>
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="nav-actions-desktop">
            <Button href="#doctors" variant="primary" size="sm">
              Find a Doctor
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer / Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="brand-text">
                <span className="brand-title">NIKI</span>
                <span className="brand-subtitle">HealthCare</span>
              </div>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mobile-nav-links">
              <li>
                <a href="#hero" className="mobile-nav-link" onClick={closeMenu}>Home</a>
              </li>
              <li>
                <a href="#specialties" className="mobile-nav-link" onClick={closeMenu}>Specialties</a>
              </li>
              <li>
                <a href="#doctors" className="mobile-nav-link" onClick={closeMenu}>Doctors</a>
              </li>
              <li>
                <a href="#availability" className="mobile-nav-link" onClick={closeMenu}>Doctor Availability</a>
              </li>
              <li>
                <a href="#about" className="mobile-nav-link" onClick={closeMenu}>About Clinic</a>
              </li>
              <li>
                <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>Contact & Hours</a>
              </li>
            </ul>

            <div className="mobile-menu-cta">
              <Button href="#doctors" variant="primary" size="md" className="mobile-cta-btn" onClick={closeMenu}>
                Find a Doctor
              </Button>
            </div>

            <div className="mobile-menu-footer">
              <p className="mobile-footer-text">Plot 42, Healthcare Enclave (Placeholder)</p>
              <p className="mobile-footer-text">Call: +91 XXX XXX XXXX (Placeholder)</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
