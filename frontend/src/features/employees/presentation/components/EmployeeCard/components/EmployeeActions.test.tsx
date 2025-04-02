import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeAction } from './EmployeeAction';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useModal } from '@/shared/providers/modal/useModal';

import { MemoryRouter } from 'react-router-dom';

vi.mock('@/shared/providers/modal/useModal', () => ({
  useModal: vi.fn(),
}));

describe('EmployeeAction', () => {
  const mockOpen = vi.fn();

  beforeEach(() => {
    (useModal as Mock).mockReturnValue({
      open: mockOpen,
    });
  });

  it('should call open when clicking "View Details"', () => {
    const employeeId = 1;
    const name = 'John Doe';

    render(
      <MemoryRouter>
        <EmployeeAction employeeId={employeeId} name={name} />
      </MemoryRouter>,
    );

    const detailsButton = screen.getByText(/View Details/i);
    fireEvent.click(detailsButton);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.anything(),
      'Employee Details',
    );
  });

  it('should call open when clicking "Delete"', () => {
    const employeeId = 1;
    const name = 'John Doe';

    render(
      <MemoryRouter>
        <EmployeeAction employeeId={employeeId} name={name} />
      </MemoryRouter>,
    );

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(mockOpen).toHaveBeenCalledWith(expect.anything(), 'Delete Employee');
  });
});
