import { describe, it, expect } from 'vitest';
import { getFormattedIsoDate } from './getFormattedIsoDate';

describe('getFormattedIsoDate', () => {
  it('should format an ISO 8601 date string correctly', () => {
    expect(getFormattedIsoDate('2021-05-02T00:00:00.000Z')).toBe('May 2, 2021');
    expect(getFormattedIsoDate('2000-01-01T00:00:00.000Z')).toBe(
      'January 1, 2000',
    );
    expect(getFormattedIsoDate('1995-12-25T00:00:00.000Z')).toBe(
      'December 25, 1995',
    );
  });

  it('should throw an error for an invalid date string', () => {
    expect(() => getFormattedIsoDate('invalid-date')).toThrow(
      'Invalid date format',
    );
  });
});
