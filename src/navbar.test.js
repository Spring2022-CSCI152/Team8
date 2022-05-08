import { unmountComponentAtNode } from "react-dom";
import {render, fireEvent, screen} from '@testing-library/react'
import Navbar from './navbar'

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('should navigate to Login page when link is clicked', () => {
  const { getByText } = render(<a href="/Login">Log out</a>);

  const link = getByText('Log out');

  fireEvent.click(link);

  expect(screen.getByRole('link')).toHaveAttribute('href', '/Login');
});

test('should navigate to Home page when link is clicked', () => {
  const { getByTestId } = render(<a href="/" data-testid="homelink"></a>);

  const link = screen.getByTestId('homelink');

  fireEvent.click(link);

  expect(screen.getByRole('link')).toHaveAttribute('href', '/');
});

test('click log out should set email to null', () => {
	const { getByText } = render(<Navbar />);
	localStorage.setItem('email', JSON.stringify("test@gmail.com"));
	const link = screen.getByText('Log out');
	
	expect(localStorage.getItem('email') !== null).toBeTruthy();
	
	fireEvent.click(link);
	
	expect(localStorage.getItem('email') === null).toBeTruthy();
});

test('click home should set title to null', () => {
	const { getByTestId } = render(<Navbar />);
	localStorage.setItem('title', JSON.stringify("cat1"));
	const link = screen.getByTestId('homelink');
	
	expect(localStorage.getItem('title') !== null).toBeTruthy();
	
	fireEvent.click(link);
	
	expect(localStorage.getItem('title') === null).toBeTruthy();
});