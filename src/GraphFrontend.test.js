import { unmountComponentAtNode } from "react-dom";
import {render, fireEvent, screen} from '@testing-library/react'
import Graph from "./Graph"
import LineChart from "./Match.js";
import LineChart1 from "./FreeRespon.js";
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
})


test('tests if button click switches button colors', () => {
  var style = "cont2"
  var style1 = "cont1"
  const { getByRole } = render(
	  <div id="type" data-testid="type">
		<h1> Study Type </h1>
		<button className={style} id="graphButton"> Matching </button><br></br>
		<button className={style1} id="graphButton"> Free Response </button>
	  </div>
  );

  // Find an element with a role of button & text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Matching' })
  const colorButton1 = screen.getByRole('button', { name: 'Free Response' })
  
  expect(colorButton).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(207, 95, 255);' })
  expect(colorButton1).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(239, 201, 254);' })
  
  fireEvent.click(colorButton1)
  
  expect(colorButton).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(239, 201, 254);' })
  expect(colorButton1).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(207, 95, 255);' })
  
  fireEvent.click(colorButton)
  
  expect(colorButton).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(207, 95, 255);' })
  expect(colorButton1).toHaveStyle({ backgroundColor: 'backgroundColor: rgb(239, 201, 254);' })
})

test('tests if graph is rendered', () => {
	const { getByText } = render(<Graph />)
	
	expect(screen.getByText("Matching")).toBeInDocument();
})

test('tests if button click switches graph components rendered', () => {
	const { getByText } = render(<Graph />)
	
	const colorButton = screen.getByRole('button', { name: 'Matching' })
	const colorButton1 = screen.getByRole('button', { name: 'Free Response' })
	
	expect(screen.getByText("Matching")).toBeInDocument();

	fireEvent.click(colorButton1)

	expect(screen.getByText("Free Response")).toBeInDocument();

	fireEvent.click(colorButton)

	expect(screen.getByText("Matching")).toBeInDocument();
})