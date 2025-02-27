import { describe, it, expect, vi } from 'vitest';
import { getElapsedTime } from './getElapsedTime';

describe('getElapsedTime', () => {
  it('should calculate elapsed time correctly from ISO 8601 strings', () => {
    vi.setSystemTime(new Date(Date.UTC(2023, 5, 10, 0, 0, 0)));

    expect(getElapsedTime('2021-05-02T00:00:00.000Z')).toBe('2y - 1m - 8d');
    expect(getElapsedTime('2020-06-10T00:00:00.000Z')).toBe('3y - 0m - 0d');
    expect(getElapsedTime('2019-12-25T00:00:00.000Z')).toBe('3y - 5m - 16d');

    vi.restoreAllMocks();
  });
});
