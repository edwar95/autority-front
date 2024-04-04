import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useParams: () => ({ id: '1' }),
  usePathname: jest.fn().mockReturnValue('/task')
}));

describe('Nav', () => {
  beforeEach(() => {
  });

  it(' should renders logo and app name', () => {
    render(<Nav />);
    const logo = screen.getByAltText('Tasks app logo');
    const appName = screen.getByText('Task App');
    expect(logo).toBeInTheDocument();
    expect(appName).toBeInTheDocument();
  });
});