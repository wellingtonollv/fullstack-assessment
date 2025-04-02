import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeInfo } from './EmployeeInfo';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@employees/domain/use-cases/getFormattedIsoDate', () => ({
  getFormattedIsoDate: vi.fn(() => '2025-03-27'),
}));

vi.mock('@employees/domain/use-cases/getElapsedTime', () => ({
  getElapsedTime: vi.fn(() => '0y - 1m - 1d'),
}));

vi.mock('@employees/domain/use-cases/getEmployeeStatusAction', () => ({
  getStatusButtonLabel: vi.fn((active: boolean) =>
    active ? 'Deactivate' : 'Activate',
  ),
}));

describe('EmployeeInfo', () => {
  const mockToggleActive = vi.fn();

  const employee = {
    id: 1,
    department: 'Engineering',
    phone: '123-456-7890',
    address: '123 Main St',
    hireDate: '2020-03-27',
    firstName: 'John',
    lastName: 'Doe',
    active: true,
    history: [
      {
        changedAt: '2023-01-01',
        department: 'Engineering',
      },
    ],
  };

  it('should render employee information correctly', () => {
    render(
      <EmployeeInfo employee={employee} onToggleActive={mockToggleActive} />,
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes('Employee ID:')),
    ).toBeInTheDocument();
    expect(screen.getByText(/Department:/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Telephone:/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
    expect(screen.getByText(/Address:/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Hire Date/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-03-27/i)).toBeInTheDocument();
    expect(screen.getByText(/0y - 1m - 1d/i)).toBeInTheDocument();
  });

  it('should call onToggleActive when the button is clicked', () => {
    render(
      <EmployeeInfo employee={employee} onToggleActive={mockToggleActive} />,
    );

    expect(screen.getByText(/Deactivate/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Deactivate/i));

    expect(mockToggleActive).toHaveBeenCalledWith(false);
  });

  it('should change the button state to "Activate" when active is false', () => {
    const inactiveEmployee = { ...employee, active: false };

    render(
      <EmployeeInfo
        employee={inactiveEmployee}
        onToggleActive={mockToggleActive}
      />,
    );

    expect(screen.getByText(/Activate/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Activate/i));

    expect(mockToggleActive).toHaveBeenCalledWith(true);
  });
});
