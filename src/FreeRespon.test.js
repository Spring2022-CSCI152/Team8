import { unmountComponentAtNode } from "react-dom";
import LineChart1 from "./FreeRespon.js";
import {render, fireEvent, screen} from '@testing-library/react'
import useResizeObserver from "use-resize-observer";
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

test('Free response line graph renders', () => {
	
	
	window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }))
	const { getByTestId } = render(<LineChart1 />);
	expect(screen.getByTestId("chart")).toBeInTheDocument()
});

test('tests if score is set using data', () => {
	let thenFn = jest.fn();
	
	const { getByText } = render(<FreeRespon />)
	
	let info = { email: "testuser@email.com", deck: "Deck1" }
	expect(mockAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/viewCards`, info);
	expect(thenFn).toHaveBeenCalledWith();
	
	expect(screen.getByText('0')).toBeInTheDocument();
});