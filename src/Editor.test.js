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

test('renders flip button', () => {
  render(<Editor />);
  const cardContentField = screen.getByRole(/button/i, {name: "Flip"});
  expect(cardContentField).toBeInTheDocument();
});

