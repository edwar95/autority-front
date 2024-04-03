import '@testing-library/jest-dom'
import { act, render, waitFor, screen } from '@testing-library/react'
import EditPage from './page'
import { getTask } from '../../service/tasksService'
import { Task } from '../../../types/task';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useParams: () => ({ id: '1' })
}));

jest.mock('../../service/tasksService', () => ({
  getTask: jest.fn(),
  updateTask: jest.fn(),
}));

class ResizeObserver {
  observe() { }
  unobserve() { }
}

describe('EditPage', () => {
  (window as any).ResizeObserver = ResizeObserver;
  it('should render the EditPage component', async () => {

    // Mock the getTask function to return a sample task
    const mockTask: Task = {
      id: 1,
      name: 'Sample Task',
      description: 'This is a sample task',
      isComplete: false,
      author: 'John Doe',
    };
    (getTask as jest.Mock).mockResolvedValue(mockTask);
    render(<EditPage />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(getTask).toHaveBeenCalledTimes(1);
    });
  });

  it('should show an error message if the task is not found', async () => {

    // Mock the getTask function to throw an error
    const rejected = new Error('Task not found');
    (getTask as jest.Mock).mockRejectedValue(rejected);

    render(<EditPage />);
    await waitFor(() => {
      expect(getTask).toHaveBeenCalledTimes(2);
    });
  })
});
