/**
 * Formats an ISO 8601 date string in the style: "Month Day, Year" (UTC Safe)
 * @param isoDate A string in ISO 8601 format (e.g., "2025-02-13T02:41:53.053Z")
 * @returns Example: "February 13, 2025"
 */
export function getFormattedDate(isoDate: string): string {
  const date = new Date(isoDate); // Garante que seja um Date válido

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  const utcYear = date.getUTCFullYear();
  const utcMonth = date.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  const utcDay = date.getUTCDate();

  return `${utcMonth} ${utcDay}, ${utcYear}`;
}
