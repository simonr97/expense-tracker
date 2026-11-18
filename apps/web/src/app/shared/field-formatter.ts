const amountFormatters = {
  ARS: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }),
  USD: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }),
};
const dateFormatter = new Intl.DateTimeFormat('en',{
  dateStyle: 'medium',
  timeZone: 'America/Argentina/Buenos_Aires',
})
const dateTimeFormatter = new Intl.DateTimeFormat('en',{
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Argentina/Buenos_Aires',
})
const isoDayFormatter = new Intl.DateTimeFormat('en-CA',{
  timeZone: 'America/Argentina/Buenos_Aires',
  year: 'numeric',
  month:'2-digit',
  day:'2-digit'
})

// 1234.5, 'ARS' -> "$ 1.234,50"
// 1234.5, 'USD' -> "US$ 1.234,50"
export function formatAmount(amount:number| string, currency:'ARS'|'USD'):string {
  return amountFormatters[currency].format(Number(amount));
}

// '2026-11-06T01:00:00.000Z' -> "Nov 5, 2026" (day in Argentina)
export function formatDate(date:string):string {
  return dateFormatter.format(new Date(date));
}

// '2026-11-06T01:00:00.000Z' -> "Nov 5, 2026, 10:00 PM" (time in Argentina)
export function formatDateTime(date:string):string {
  return dateTimeFormatter.format(new Date(date));
}

// '2026-11-05' (value of an <input type="date">) -> "Nov 5, 2026"
export function formatCalendarDate(date:string):string {
  return formatDate(`${date}T00:00:00-03:00`);
}

// '2026-11-06T01:00:00.000Z' -> "2026-11-05" (day in Argentina, the format an <input type="date"> expects)
export function formatISODate(date:string):string{
  return isoDayFormatter.format(new Date(date));
}
