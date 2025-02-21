/**
 * Formats a date in the style: "Month Day, Year (Xy - Xm - Xd)"
 * @param isoDate ISO date format (e.g., "2021-05-02T00:00:00.000Z")
 * @returns Example: "May 2, 2021 (2y - 1m - 4d)"
 */
export const formatDateWithElapsedTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();

  // Format the date as "Month Day, Year"
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate elapsed time (years, months, days)
  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();
  let days = now.getDate() - date.getDate();

  if (days < 0) {
    months -= 1;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${formattedDate} (${years}y - ${months}m - ${days}d)`;
};
