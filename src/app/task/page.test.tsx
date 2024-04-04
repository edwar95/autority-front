import { render, screen } from '@testing-library/react';
import { NewTask } from '../../types/task';
import Page from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useParams: () => ({ id: '1' })
}));

class ResizeObserver {
  observe() { }
  unobserve() { }
}

describe('Edit Page', () => {
  (window as any).ResizeObserver = ResizeObserver;
  it('renders task details correctly', () => {
    const task: NewTask = {
      name: 'Task Name',
      description: 'Task Description',
      author: 'Task Author',
      isComplete: false
    };

    render(<Page />);

    expect(screen.getByText(task.name)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(task.author)).toBeInTheDocument();
  });
});