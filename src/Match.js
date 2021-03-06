import React, { Component, useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from "axios";

export default class LineChart extends Component {

	chartRef = React.createRef();

	async componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		const email = localStorage.getItem('email')
		const deck = localStorage.getItem('deck')
		var scores = [];
		await axios.post(`${process.env.REACT_APP_BASE_URL}/viewCards`, { email: email, deck: deck }).then((response) => {
			//console.log(response.data)
			if (response.data.Deck != null) {
				scores = (response.data.Deck.MScores);
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
				data-testid = "chart"
				/>
			)
	}
}