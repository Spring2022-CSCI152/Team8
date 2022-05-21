import { unmountComponentAtNode } from "react-dom";
import {useEffect} from "./Matching";
import Matching from './Matching';
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
})

test('matching page renders if no data exists', () => {
  const { getByText } = render(<Matching />)
  expect(screen.getByText('Front')).toBeInTheDocument();
});

test('matching page renders table when data is called', () => {
	let thenFn = jest.fn();
	
	const { getByText } = render(<Matching />)
	
	let info = { email: "testuser@email.com", deck: "Deck1" }
	expect(mockAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/viewCards`, info);
	expect(thenFn).toHaveBeenCalledWith();
	
	expect(screen.getByText('front1')).toBeInTheDocument();
	expect(screen.getByText('back1')).toBeInTheDocument();
	
	
});

test('matching page renders popup upon clicking submit', () => {
	const { getByText } = render(<Matching />)
	const btn = screen.getByText('Submit');
	expect(btn).toBeInTheDocument();
	
	fireEvent.click(btn);
	
	expect(screen.getByText('Score')).toBeInTheDocument();
	
});