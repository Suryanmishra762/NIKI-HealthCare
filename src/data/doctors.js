/* ==========================================================================
   DOCTORS DATA — NIKI HealthCare
   --------------------------------------------------------------------------
   Single source of truth for doctor identity, qualifications, specialty,
   experience, consultation room, and biographical profile details.

   Date-specific availability and consultation time slots are strictly
   managed by src/data/schedules.js.
   ========================================================================== */

export const doctors = [
  {
    id: 'dr-arjun-mehta',
    name: 'Dr. Arjun Mehta',
    title: 'Senior ENT Specialist & Surgeon',
    specialty: 'ENT',
    specialtyId: 'ent',
    qualifications: 'MBBS, MS (ENT), DNB',
    experienceYears: 14,
    experience: '14+ Years Experience',
    room: 'Suite 102',
    bio: 'Specializing in advanced endoscopic sinus surgery, micro-ear surgery, vertigo evaluation, and pediatric ENT consultations.',
    languages: ['English', 'Hindi', 'Gujarati'],
    avatarPlaceholder: 'AM',
    photoUrl: '/images/doctor-arjun.jpg'
  },
  {
    id: 'dr-ananya-rao',
    name: 'Dr. Ananya Rao',
    title: 'Consultant Dermatologist',
    specialty: 'Dermatology',
    specialtyId: 'dermatology',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 10,
    experience: '10+ Years Experience',
    room: 'Suite 105',
    bio: 'Clinical dermatologist focused on inflammatory skin disorders, eczema, hair loss diagnostics, and medical phototherapy.',
    languages: ['English', 'Hindi', 'Kannada'],
    avatarPlaceholder: 'AR',
    photoUrl: '/images/doctor-ananya.jpg'
  },
  {
    id: 'dr-rohan-sharma',
    name: 'Dr. Rohan Sharma',
    title: 'Consultant Cardiologist',
    specialty: 'Cardiology',
    specialtyId: 'cardiology',
    qualifications: 'MBBS, MD (General Medicine), DM (Cardiology)',
    experienceYears: 16,
    experience: '16+ Years Experience',
    room: 'Suite 201',
    bio: 'Expert in preventive cardiovascular medicine, ambulatory blood pressure management, lipidology, and diagnostic echocardiography.',
    languages: ['English', 'Hindi', 'Punjabi'],
    avatarPlaceholder: 'RS',
    photoUrl: '/images/doctor-rohan.jpg'
  },
  {
    id: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    title: 'Consultant Pediatrician',
    specialty: 'Pediatrics',
    specialtyId: 'pediatrics',
    qualifications: 'MBBS, DCH, DNB (Pediatrics)',
    experienceYears: 11,
    experience: '11+ Years Experience',
    room: 'Suite 108',
    bio: 'Dedicated child specialist offering comprehensive developmental assessments, childhood immunization, and adolescent medicine.',
    languages: ['English', 'Hindi', 'Malayalam'],
    avatarPlaceholder: 'PN',
    photoUrl: null
  },
  {
    id: 'dr-vikram-joshi',
    name: 'Dr. Vikram Joshi',
    title: 'Consultant Orthopedic Surgeon',
    specialty: 'Orthopedics',
    specialtyId: 'orthopedics',
    qualifications: 'MBBS, MS (Orthopedics), Fellowship Joint Care',
    experienceYears: 13,
    experience: '13+ Years Experience',
    room: 'Suite 204',
    bio: 'Specialist in conservative joint preservation, sports injury evaluation, degenerative arthritis management, and post-trauma recovery.',
    languages: ['English', 'Hindi', 'Marathi'],
    avatarPlaceholder: 'VJ',
    photoUrl: null
  },
  {
    id: 'dr-sunita-patel',
    name: 'Dr. Sunita Patel',
    title: 'Consultant Physician & Diabetologist',
    specialty: 'General Medicine',
    specialtyId: 'general-medicine',
    qualifications: 'MBBS, MD (Internal Medicine)',
    experienceYears: 15,
    experience: '15+ Years Experience',
    room: 'Suite 101',
    bio: 'Internal medicine specialist dedicated to chronic disease management, glycemic regulation in diabetes, and comprehensive preventive care.',
    languages: ['English', 'Hindi', 'Gujarati'],
    avatarPlaceholder: 'SP',
    photoUrl: null
  }
];
