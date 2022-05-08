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
});


test('tests button switch colors', () => {
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

test('tests title', () => {
  var style = "cont2"
  var style1 = "cont1"
  const { getByRole } = render(
	  <Graph />
  );
  
	localStorage.setItem('title', JSON.stringify("cat1"));
	
	expect(localStorage.getItem('title') !== null).toBeTruthy();
})

test('tests if email is null', () => {
  var style = "cont2"
  var style1 = "cont1"
  localStorage.setItem('email', JSON.stringify("test@gmail.com"));
  const { getByRole } = render(<Graph />);
	expect(localStorage.getItem('email') !== null).toBeTruthy();
})

test('tests button switch graphs', () => {
  var style = "cont2"
  var style1 = "cont1"
    const match = LineChart;
  const free = LineChart1;
  window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
  
  const { getByRole } = render(
	  <Graph />
  );

  // Find an element with a role of button & text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Matching' })
  const colorButton1 = screen.getByRole('button', { name: 'Free Response' })
  const chart = screen.getByRole('display')
   
  fireEvent.click(colorButton1)
  

    
  fireEvent.click(colorButton)
  

})