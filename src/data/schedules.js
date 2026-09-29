/* ==========================================================================
   DEMO Schedule Data — NIKI HealthCare
   -----------------------------------------------------------------------
   IMPORTANT: This is entirely fictional placeholder data.
   All doctor names, timings, and room designations are for demonstration only.

   Data format:
   - date: ISO 'YYYY-MM-DD' string (machine-readable, timezone-agnostic)
   - slots: Array — a single doctor may have multiple slots on the same day

   When Firestore replaces this file the component contract stays the same:
     doctorId    → references doctors.js  id
     specialtyId → references specialties.js  id
     date        → 'YYYY-MM-DD'
     slots[]     → { startTime, endTime, status }

   NOTE: consultation room is NOT duplicated here.
   It comes from the doctor object in doctors.js (doctor.room).
   ========================================================================== */

/**
 * Helper: generate dates relative to today so the demo always has
 * "future" data no matter when it's opened.
 */
function pad(n) { return n < 10 ? '0' + n : '' + n; }

function offsetDate(dayOffset) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Pre-compute the next 10 days so every entry is always relevant.
const D = {};
for (let i = 0; i <= 10; i++) {
  D[`d${i}`] = offsetDate(i);
}

export const schedules = [
  // ── Dr. Arjun Mehta — ENT ──────────────────────────────────────────────
  {
    doctorId: 'dr-arjun-mehta',
    specialtyId: 'ent',
    date: D.d0,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-arjun-mehta',
    specialtyId: 'ent',
    date: D.d1,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' },
      { startTime: '4:00 PM',  endTime: '7:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-arjun-mehta',
    specialtyId: 'ent',
    date: D.d3,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-arjun-mehta',
    specialtyId: 'ent',
    date: D.d5,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' },
      { startTime: '4:00 PM',  endTime: '7:00 PM', status: 'available' }
    ]
  },

  // ── Dr. Ananya Rao — Dermatology ───────────────────────────────────────
  {
    doctorId: 'dr-ananya-rao',
    specialtyId: 'dermatology',
    date: D.d0,
    slots: [
      { startTime: '4:00 PM', endTime: '7:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-ananya-rao',
    specialtyId: 'dermatology',
    date: D.d2,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-ananya-rao',
    specialtyId: 'dermatology',
    date: D.d4,
    slots: [
      { startTime: '2:00 PM', endTime: '5:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-ananya-rao',
    specialtyId: 'dermatology',
    date: D.d6,
    slots: [
      { startTime: '10:00 AM', endTime: '1:00 PM', status: 'available' },
      { startTime: '4:00 PM',  endTime: '7:00 PM', status: 'available' }
    ]
  },

  // ── Dr. Rohan Sharma — Cardiology ──────────────────────────────────────
  {
    doctorId: 'dr-rohan-sharma',
    specialtyId: 'cardiology',
    date: D.d0,
    slots: [
      { startTime: '5:00 PM', endTime: '8:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-rohan-sharma',
    specialtyId: 'cardiology',
    date: D.d1,
    slots: [
      { startTime: '5:00 PM', endTime: '8:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-rohan-sharma',
    specialtyId: 'cardiology',
    date: D.d3,
    slots: [
      { startTime: '5:00 PM', endTime: '8:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-rohan-sharma',
    specialtyId: 'cardiology',
    date: D.d5,
    slots: [
      { startTime: '10:00 AM', endTime: '12:30 PM', status: 'available' },
      { startTime: '5:00 PM',   endTime: '8:00 PM', status: 'available' }
    ]
  },

  // ── Dr. Priya Nair — Pediatrics ────────────────────────────────────────
  {
    doctorId: 'dr-priya-nair',
    specialtyId: 'pediatrics',
    date: D.d1,
    slots: [
      { startTime: '9:30 AM', endTime: '1:30 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-priya-nair',
    specialtyId: 'pediatrics',
    date: D.d3,
    slots: [
      { startTime: '9:30 AM', endTime: '1:30 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-priya-nair',
    specialtyId: 'pediatrics',
    date: D.d5,
    slots: [
      { startTime: '9:30 AM', endTime: '1:30 PM', status: 'available' }
    ]
  },

  // ── Dr. Vikram Joshi — Orthopedics ─────────────────────────────────────
  {
    doctorId: 'dr-vikram-joshi',
    specialtyId: 'orthopedics',
    date: D.d0,
    slots: [
      { startTime: '11:00 AM', endTime: '3:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-vikram-joshi',
    specialtyId: 'orthopedics',
    date: D.d2,
    slots: [
      { startTime: '11:00 AM', endTime: '3:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-vikram-joshi',
    specialtyId: 'orthopedics',
    date: D.d4,
    slots: [
      { startTime: '11:00 AM', endTime: '3:00 PM', status: 'available' }
    ]
  },

  // ── Dr. Sunita Patel — General Medicine ────────────────────────────────
  {
    doctorId: 'dr-sunita-patel',
    specialtyId: 'general-medicine',
    date: D.d0,
    slots: [
      { startTime: '9:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-sunita-patel',
    specialtyId: 'general-medicine',
    date: D.d1,
    slots: [
      { startTime: '9:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-sunita-patel',
    specialtyId: 'general-medicine',
    date: D.d2,
    slots: [
      { startTime: '9:00 AM', endTime: '1:00 PM', status: 'available' },
      { startTime: '4:00 PM', endTime: '6:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-sunita-patel',
    specialtyId: 'general-medicine',
    date: D.d4,
    slots: [
      { startTime: '9:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  },
  {
    doctorId: 'dr-sunita-patel',
    specialtyId: 'general-medicine',
    date: D.d6,
    slots: [
      { startTime: '9:00 AM', endTime: '1:00 PM', status: 'available' }
    ]
  }
];

/**
 * Utility: get unique dates that have at least one schedule entry.
 * Returns sorted YYYY-MM-DD strings.
 */
export function getScheduledDates() {
  const set = new Set(schedules.map(s => s.date));
  return [...set].sort();
}

/**
 * Core lookup used by the availability UI.
 *
 * @param {string} dateISO   – 'YYYY-MM-DD'
 * @param {string} specialtyId – specialty id or 'all'
 * @returns {{ doctorId: string, specialtyId: string, slots: Array }}[]
 */
export function getAvailability(dateISO, specialtyId = 'all') {
  return schedules.filter(entry => {
    if (entry.date !== dateISO) return false;
    if (specialtyId !== 'all' && entry.specialtyId !== specialtyId) return false;
    return true;
  });
}

/**
 * Get upcoming schedule entries for a specific doctor.
 * Returns sorted by date, each with { date, slots }.
 * Used by the profile preview to show date-specific upcoming availability.
 *
 * @param {string} doctorId
 * @returns {{ date: string, slots: Array }}[]
 */
export function getUpcomingSchedule(doctorId) {
  const today = offsetDate(0);
  const entries = schedules
    .filter(entry => entry.doctorId === doctorId && entry.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Group by date (in case multiple entries exist for the same date)
  const grouped = {};
  for (const entry of entries) {
    if (!grouped[entry.date]) {
      grouped[entry.date] = [];
    }
    grouped[entry.date].push(...entry.slots);
  }

  return Object.entries(grouped).map(([date, slots]) => ({ date, slots }));
}

/**
 * Check if a doctor has any schedule entry for today.
 * Replaces the hardcoded isAvailableToday boolean in doctors.js.
 *
 * @param {string} doctorId
 * @returns {boolean}
 */
export function isDoctorAvailableToday(doctorId) {
  const today = offsetDate(0);
  return schedules.some(entry => entry.doctorId === doctorId && entry.date === today);
}
