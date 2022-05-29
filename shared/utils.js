export const DAY_LENGTH = 86400000;
export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function offsetDays(date = new Date(), days = 0) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

export function getWeek(date) {
  const day = date.getDay();
  const weekStart = startOfDay(offsetDays(date, -(day === 0 ? 7 : day - 1)));
  const days = [];

  for (let i = 0; i < 7; i++) days.push(offsetDays(weekStart, i));

  return days.sort((a, b) => (a > b ? 1 : -1));
}

export function startOfDay(date = new Date()) {
  const nextDate = new Date(date);
  nextDate.setHours(0);
  nextDate.setMilliseconds(0);
  nextDate.setMinutes(0);
  nextDate.setSeconds(0);
  return nextDate;
}
