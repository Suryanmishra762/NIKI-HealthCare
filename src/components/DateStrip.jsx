import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SCHEDULE_WINDOW_DAYS } from '../data/schedules';
import './DateStrip.css';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function pad(n) { return n < 10 ? '0' + n : '' + n; }

/** Convert a Date object to 'YYYY-MM-DD'. */
export function toISODate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Human-friendly: "29 September" */
export function formatDateDisplay(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1]}`;
}

/** Build an array of { date: Date, iso: string, ... } for the strip. */
export function buildDays(count = SCHEDULE_WINDOW_DAYS) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      date: d,
      iso: toISODate(d),
      dayName: DAY_NAMES[d.getDay()],
      dayNum: d.getDate(),
      monthAbbr: MONTH_ABBR[d.getMonth()],
      isToday: i === 0
    });
  }
  return days;
}

export function DateStrip({ selectedDate, onSelectDate, count = SCHEDULE_WINDOW_DAYS }) {
  const scrollRef = useRef(null);
  const days = buildDays(count);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="date-strip-wrapper">
      <button
        type="button"
        className="date-strip-arrow date-strip-arrow-left"
        onClick={() => scroll(-1)}
        aria-label="Scroll dates left"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="date-strip-track" ref={scrollRef} role="listbox" aria-label="Select consultation date">
        {days.map((day) => {
          const isSelected = selectedDate === day.iso;
          return (
            <button
              key={day.iso}
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`date-strip-item ${isSelected ? 'date-selected' : ''} ${day.isToday ? 'date-today' : ''}`}
              onClick={() => onSelectDate(day.iso)}
            >
              <span className="date-strip-day-name">{day.isToday ? 'Today' : day.dayName}</span>
              <span className="date-strip-day-num">{day.dayNum}</span>
              <span className="date-strip-month">{day.monthAbbr}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="date-strip-arrow date-strip-arrow-right"
        onClick={() => scroll(1)}
        aria-label="Scroll dates right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default DateStrip;
