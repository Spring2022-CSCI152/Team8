import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export default class LineChart extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		const scores = [55,55,50,52,50,88];
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
					text: 'Matching'
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
				/>
			)
	}
}