import React, { Component, useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from "axios";
import ref from "use-resize-observer";


export default class LineChart extends Component {

	chartRef = React.createRef();


	async componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		const email = localStorage.getItem('email')
		const deck = localStorage.getItem('deck')
		console.log(email)
		var scores = [];
		await axios.post(`${process.env.REACT_APP_BASE_URL}/viewCards`, { email: email, deck: deck }).then((response) => {
			//console.log(response.data)
			if (response.data.Deck != null) {
				scores = (response.data.Deck.FRScores);
			}
		})
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