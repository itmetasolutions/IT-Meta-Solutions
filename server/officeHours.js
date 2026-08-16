// Mon–Fri, 9:00–18:00 UK local time (handles BST/GMT automatically).
export function isWithinOfficeHours(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    hour12: false,
    weekday: 'short',
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value);

  const isWeekday = !['Sat', 'Sun'].includes(weekday);
  return isWeekday && hour >= 9 && hour < 18;
}
