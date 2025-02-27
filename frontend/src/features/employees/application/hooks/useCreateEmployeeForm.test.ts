import { renderHook } from '@testing-library/react';
import { useCreateEmployeeForm } from './useCreateEmployeeForm';
import { describe, it, expect } from 'vitest';

describe('useCreateEmployeeForm', () => {
  it('should initialize form with default values', () => {
    const { result } = renderHook(() => useCreateEmployeeForm());

    const { hireDate, ...otherValues } = result.current.getValues();

    expect(hireDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);

    expect(otherValues).toEqual({
      firstName: '',
      lastName: '',
      phone: '',
      departmentId: 0,
      address: '',
      active: true,
    });
  });
});
