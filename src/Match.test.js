import { unmountComponentAtNode } from "react-dom";
import LineChart2 from "./Match.js";
import {render, fireEvent, screen} from '@testing-library/react'
import useResizeObserver from "use-resize-observer";

jest.mock('${process.env.REACT_APP_BASE_URL}/viewCards)');

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

test('Match line graph renders', () => {
	const email = 'testuser@tmail.com';
	const deck = 'Deck1'
	window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }))
	const { getByTestId } = render(<LineChart2 />);
	expect(screen.getByTestId("chart")).toBeInTheDocument()
});