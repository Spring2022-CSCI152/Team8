import React, { useState } from "react";
import LineChart from "./Matching.js";
import LineChart1 from "./FreeRespon.js";
import "./Graph.css";

const Graph = () => {
	
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
	<div id="graph">
      <div id="chart">
	  {chart}
      </div>
	  <div id="type">
		<h1> Study Type </h1>
		<button className={style} onClick={changeStyle}> Matching </button><br></br>
		<button className={style1} onClick={changeStyle1}> Free Response </button>
	  </div>
	  </div>
    );   
}

export default Graph;