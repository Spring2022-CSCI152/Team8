import { unmountComponentAtNode } from "react-dom";
import {render, fireEvent, screen} from '@testing-library/react'
import Home from './Home'
import {togglePopup} from './Home'
jest.mock("axios");

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  mockAxios.reset();
});


test('home page renders if no data exists', () => {
  const { getByRole } = render(<Home />)
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('tests if home page renders if data exists', () => {
	let thenFn = jest.fn();
	
	const { getByText } = render(<Home />)
	
	let info = { email: "testuser@email.com", deck: "Deck1" }
	expect(mockAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/viewCards`, info);
	expect(thenFn).toHaveBeenCalledWith();
	
	expect(screen.getByText('Deck1')).toBeInTheDocument();
});

test('tests if data exists and card click renders pop up', () => {
	let thenFn = jest.fn();
	
	const { getByText } = render(<Home />)
	
	let info = { email: "testuser@email.com", deck: "Deck1" }
	expect(mockAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/viewCards`, info);
	expect(thenFn).toHaveBeenCalledWith();
	
	fireEvent.click(screen.getByText('Deck1'));

	expect(screen.getByText('Study with Matching')).toBeInTheDocument();
})