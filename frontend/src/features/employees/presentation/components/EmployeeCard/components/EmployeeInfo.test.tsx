import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EmployeeInfo } from './EmployeeInfo';
import { getFormattedIsoDate } from '@employees/domain/use-cases/getFormattedIsoDate';
import { getElapsedTime } from '@employees/domain/use-cases/getElapsedTime';

// Mocking the modules
vi.mock('@employees/domain/use-cases/getFormattedIsoDate', () => ({
  getFormattedIsoDate: vi.fn(() => '2024-03-27'),
}));

vi.mock('@employees/domain/use-cases/getElapsedTime', () => ({
  getElapsedTime: vi.fn(() => '2 years'),
}));

describe('EmployeeInfo Component', () => {
  it('should render the first and last name correctly', () => {
    render(
      <EmployeeInfo firstName="John" lastName="Doe" hireDate="2022-01-01" />,
    );

    expect(screen.getByTitle('John Doe')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display the department if provided', () => {
    render(
      <EmployeeInfo
        firstName="John"
        lastName="Doe"
        department="Engineering"
        hireDate="2022-01-01"
      />,
    );

    expect(screen.getByText('(Engineering)')).toBeInTheDocument();
  });

  it('should correctly format and display the hire date', () => {
    render(
      <EmployeeInfo firstName="John" lastName="Doe" hireDate="2022-01-01" />,
    );

    expect(screen.getByText('Hire Date:')).toBeInTheDocument();
    expect(screen.getByText('2024-03-27 (2 years)')).toBeInTheDocument();
  });

  it('should call the formatting and elapsed time functions correctly', () => {
    render(
      <EmployeeInfo firstName="John" lastName="Doe" hireDate="2022-01-01" />,
    );

    expect(getFormattedIsoDate).toHaveBeenCalledWith('2022-01-01');
    expect(getElapsedTime).toHaveBeenCalledWith('2022-01-01');
  });
});
