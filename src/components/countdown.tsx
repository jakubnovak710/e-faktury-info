/**
 * Countdown Timer Component
 *
 * Displays days/hours/minutes/seconds until a target date.
 * Used on homepage hero to create urgency (Loss Aversion + Scarcity).
 *
 * Psychology: Urgency heuristic — visible countdown creates time pressure.
 * SEO: Enhances engagement metrics (time on page, scroll depth).
 *
 * Usage:
 *   <Countdown targetDate="2027-01-01T00:00:00" locale="sk" />
 */

'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
  locale: 'sk' | 'en';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LABELS = {
  sk: { days: 'dní', hours: 'hodín', minutes: 'minút', seconds: 'sekúnd' },
  en: { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
};

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate, locale }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const labels = LABELS[locale];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const segments: { value: number; label: string }[] = [
    { value: time.days, label: labels.days },
    { value: time.hours, label: labels.hours },
    { value: time.minutes, label: labels.minutes },
    { value: time.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {segments.map((seg) => (
        <div key={seg.label} className="flex flex-col items-center">
          <span className="text-3xl font-black tabular-nums text-[var(--accent)] sm:text-4xl lg:text-5xl">
            {String(seg.value).padStart(2, '0')}
          </span>
          <span className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            {seg.label}
          </span>
        </div>
      ))}
    </div>
  );
}
