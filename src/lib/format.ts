export function formatDisplayDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00+09:00`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}
