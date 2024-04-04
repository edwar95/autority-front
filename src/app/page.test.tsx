import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { deleteTaskById, markAsCompleted, getTasks } from './service/tasksService';
import Page from './page';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useParams: () => ({ id: '1' })
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('./service/tasksService', () => ({
  deleteTaskById: jest.fn(),
  markAsCompleted: jest.fn(),
  getTasks: jest.fn(),
}));

describe('Create Page', () => {
  const mockRouterPush = jest.fn();
  const mockToastSuccess = jest.fn();
  const mockDeleteTaskById = jest.fn();
  const mockMarkAsCompleted = jest.fn();
  const mockGetTasks = jest.fn();

  beforeEach(() => {

    //(toast.success as jest.Mock).mockImplementation(mockToastSuccess);

    (deleteTaskById as jest.Mock).mockImplementation(mockDeleteTaskById);
    (markAsCompleted as jest.Mock).mockImplementation(mockMarkAsCompleted);
    (getTasks as jest.Mock).mockImplementation(mockGetTasks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the table with tasks', async () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', description: 'Description 1', author: 'Author 1', isComplete: false },
      { id: 2, name: 'Task 2', description: 'Description 2', author: 'Author 2', isComplete: true },
    ];

    mockGetTasks.mockResolvedValue(mockTasks);

    render(<Page />);


    await waitFor(() => {
      const tableElement = screen.getByRole('table');
      expect(tableElement).toBeInTheDocument();

      // Assert that the tasks are rendered in the table
      const taskRows = screen.getAllByRole('row');
      expect(taskRows).toHaveLength(mockTasks.length + 1); // +1 for the table header row

      // Assert that the task data is rendered correctly
      const task1Row = taskRows[1];
      expect(task1Row).toHaveTextContent('Task 1');
      expect(task1Row).toHaveTextContent('Description 1');
      expect(task1Row).toHaveTextContent('Author 1');
      expect(task1Row).toHaveTextContent('Pending');

      const task2Row = taskRows[2];
      expect(task2Row).toHaveTextContent('Task 2');
      expect(task2Row).toHaveTextContent('Description 2');
      expect(task2Row).toHaveTextContent('Author 2');
      expect(task2Row).toHaveTextContent('Completed');
    });

  });
});