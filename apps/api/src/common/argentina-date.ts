// Argentina has a fixed UTC-3 offset (no daylight saving since 2009).
const ARGENTINA_UTC_OFFSET = '-03:00';
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

// A calendar day from the form ('YYYY-MM-DD') becomes midnight in Argentina, not midnight UTC
// (which is 21:00 of the previous day there). Full ISO strings keep their own offset.
// Anything else is returned as is so @IsDate() rejects it.
export function toArgentinaDate(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  return DATE_ONLY.test(value)
    ? new Date(`${value}T00:00:00${ARGENTINA_UTC_OFFSET}`)
    : new Date(value);
}

// 03:00 UTC is midnight in Argentina. Month overflow handles December.
export function argentinaMonthRange(yearMonth: string) {
  const [year, month] = yearMonth.split('-').map(Number);
  return {
    start: new Date(Date.UTC(year, month - 1, 1, 3)),
    end: new Date(Date.UTC(year, month, 1, 3)),
  };
}

