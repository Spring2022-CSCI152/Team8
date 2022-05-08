import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import LineChart from "./Match.js";
import LineChart1 from "./FreeRespon.js";
import "./Graph.css";
import ResizeObserver from "use-resize-observer";
import Navbar from "./navbar"

const Graph = () => {
	
	const title = localStorage.getItem('title');
	
	if(localStorage.getItem('email') === null){
		window.location = '/Login';
	}
	
	const [style, setStyle] = useState("cont2");
	const [style1, setStyle1] = useState("cont1");
	const [chart, setChart] = useState(<LineChart />);
	
	const changeStyle = () => {  
		setStyle("cont2");
		setStyle1("cont1");
		setChart(<LineChart />);
	};
	
	const changeStyle1 = () => {  
		setStyle("cont1");
		setStyle1("cont2");
		setChart(<LineChart1 />);
	};
	
    return (
	<>
	<Navbar />
	<div id="graph">
      <div id="chart" role="display">
	  {chart}
      </div>
	  <div id="type" data-testid="type">
		<h1> Study Type </h1>
		<button className={style} id="graphButton" onClick={changeStyle}> Matching </button><br></br>
		<button className={style1} id="graphButton" onClick={changeStyle1}> Free Response </button>
	  </div>
	  </div>
	  </>
    );   
}

export default Graph;