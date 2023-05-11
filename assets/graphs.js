google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
	console.log(report.monthArray);
	let array = [["Month", "Sales"]];
	for (i = 0; i < report.monthArray.length; i++) {
		array.push([report.monthArray[i].Month, report.monthArray[i].Sales]);
	}
	const data = google.visualization.arrayToDataTable(array);
	const options = {
		title: "Sales Performance By Month",
		width: 1100,
		height: 250,
		hAxis: { slantedText: true },
		vAxis: {
			format: "currency",
			gridlines: { color: "black", minSpacing: 20 },
		},
	};
	const chart = new google.visualization.ColumnChart(
		document.getElementById("chart1")
	);
	chart.draw(data, options);
}
