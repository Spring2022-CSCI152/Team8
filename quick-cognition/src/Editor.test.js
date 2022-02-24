import { render, screen } from '@testing-library/react';
import Editor from './Editor';

test('renders title field', () => {
  render(<Editor />);
  const titleElement = screen.getByLabelText(/title/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders card content field', () => {
  render(<Editor />);
  const cardContentField = screen.getByLabelText(/content/i);
  expect(cardContentField).toBeInTheDocument();
});

