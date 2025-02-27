import { describe, it, expect } from 'vitest';
import { getFormattedDate } from './getFormattedDate';

describe('getFormattedDate', () => {
  it('should format an ISO 8601 date string correctly', () => {
    expect(getFormattedDate('2021-05-02T00:00:00.000Z')).toBe('May 2, 2021');
    expect(getFormattedDate('2000-01-01T00:00:00.000Z')).toBe(
      'January 1, 2000',
    );
    expect(getFormattedDate('1995-12-25T00:00:00.000Z')).toBe(
      'December 25, 1995',
    );
  });

  it('should throw an error for an invalid date string', () => {
    expect(() => getFormattedDate('invalid-date')).toThrow(
      'Invalid date format',
    );
  });
});
