import { unmountComponentAtNode } from "react-dom";
import LineChart1 from "./FreeRespon.js";
import {render, fireEvent, screen} from '@testing-library/react'
import useResizeObserver from "use-resize-observer";

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



test('Free response line graph renders', () => {
	window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
	const { getByTestId } = render(<LineChart1 />);
	expect(screen.getByTestId("chart")).toBeInTheDocument()
});