import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteEmployeeContent } from './DeleteEmployeeContent';
import { useModal } from '@/shared/providers/modal/useModal';
import { useDeleteEmployee } from '@employees/application/mutations/useDeleteEmployee';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

vi.mock('@/shared/providers/modal/useModal', () => ({
  useModal: vi.fn(),
}));

vi.mock('@employees/application/mutations/useDeleteEmployee', () => ({
  useDeleteEmployee: vi.fn(),
}));

const mockClose = vi.fn();
const mockMutate = vi.fn((_, { onSuccess }) => onSuccess?.());
const queryClient = new QueryClient();

beforeEach(() => {
  vi.clearAllMocks();

  (useModal as Mock).mockReturnValue({ close: mockClose });

  (useDeleteEmployee as Mock).mockReturnValue({
    mutate: mockMutate,
    status: 'idle',
  });
});

describe('DeleteEmployeeContent', () => {
  it('should render confirmation message with employee name', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteEmployeeContent employeeId={123} name="John Doe" />
      </QueryClientProvider>,
    );

    expect(
      screen.getByText(
        /Are you sure you want to Delete the employee John Doe\?/i,
      ),
    ).toBeInTheDocument();
  });

  it('should call useDeleteEmployee.mutate and close modal on success', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteEmployeeContent employeeId={123} name="John Doe" />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() =>
      expect(mockMutate).toHaveBeenCalledWith('123', {
        onSuccess: expect.any(Function),
      }),
    );
    await waitFor(() => expect(mockClose).toHaveBeenCalled());
  });

  it('should disable delete button when isLoading is true', () => {
    (useDeleteEmployee as Mock).mockReturnValue({
      mutate: mockMutate,
      status: 'pending',
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteEmployeeContent employeeId={123} name="John Doe" />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByRole('button', { name: /Deleting.../i });
    expect(deleteButton).toBeDisabled();
  });

  it('should close modal when clicking cancel', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteEmployeeContent employeeId={123} name="John Doe" />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockClose).toHaveBeenCalled();
  });
});
