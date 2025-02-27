/**
 * Calculates elapsed time since a given ISO 8601 date in years, months, and days (UTC Safe)
 * @param isoDate A string in ISO 8601 format (e.g., "2025-02-13T02:41:53.053Z")
 * @returns Example: "2y - 1m - 4d"
 */
export function getElapsedTime(isoDate: string): string {
  const date = new Date(isoDate); 
  const now = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
    ),
  );

  let years = now.getUTCFullYear() - date.getUTCFullYear();
  let months = now.getUTCMonth() - date.getUTCMonth();
  let days = now.getUTCDate() - date.getUTCDate();

  if (days < 0) {
    months -= 1;
    const lastMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0),
    );
    days += lastMonth.getUTCDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}y - ${months}m - ${days}d`;
}
