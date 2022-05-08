import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import ref from "use-resize-observer";

export default class LineChart extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		const scores = [65,45,50,62,40,88];
		const labels = Array.from(Array(scores.length).keys());
		
		new Chart(ctx, {
			type: "line",
			data: {
				labels: labels,
				datasets: [{ 
					data: scores,
					label: "Score(%)",
					borderColor: "#cf5fff",
					backgroundColor: "#fbf2ff",
					/*fill: False,*/
				}]
			},
			 options: {
				responsive: true,
				plugins: {
				  title: {
					display: true,
					text: 'Free Response'
				  }
				},
				scales: {
				  y: {
					min: 0,
					max: 100,
				  }
				}
			},
		});
	}
	render() {
		return (
				<canvas
				id="myChart"
				ref={this.chartRef}
				data-testid = "chart"
				></canvas>
			)
	}
}