import { describe, expect, it } from 'vitest';
import { getFormattedDate } from './getFormattedDate';

describe('getFormattedDate', () => {
  it('should format a valid date string correctly', () => {
    expect(getFormattedDate('2025-02-13T02:41:53.053Z')).toBe('02/13/2025');
  });

  it('should format another valid date string correctly', () => {
    expect(getFormattedDate('2024-12-25T10:00:00.000Z')).toBe('12/25/2024');
  });

  it('should throw an error for an invalid date string', () => {
    expect(() => getFormattedDate('invalid-date')).toThrow(
      'Invalid date format',
    );
  });

  it('should throw an error for empty string input', () => {
    expect(() => getFormattedDate('')).toThrow('Invalid date format');
  });

  it('should correctly handle different time zones', () => {
    expect(getFormattedDate('2025-07-04T23:59:59.999Z')).toBe('07/04/2025');
    expect(getFormattedDate('2025-01-01T00:00:00.000Z')).toBe('01/01/2025');
  });
});
