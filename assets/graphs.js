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
		document.getElementById("monthlyPerformanceGraph")
	);
	chart.draw(data, options);
}
function drawSalesVConversionChart(title, divId, hAxisTitle) {
	//build an array like the example below, ( Month, Sales $number, CR percentage.)
	var data = google.visualization.arrayToDataTable([
		["Month", "Sales", "Profit Margin"],
		["Jan", 1000, 25],
		["Feb", 2000, 20],
		["Mar", 3000, 15],
		["Apr", 2500, 10],
		["May", 1500, 5],
	]);

	var options = {
		title: title,
		hAxis: {
			title: hAxisTitle,
			titleTextStyle: { color: "#333" },
		},
		vAxis: { minValue: 0 },
		series: {
			0: { type: "bars" },
			1: {
				type: "line",
				targetAxisIndex: 1,
				format: "#'%'",
				tooltip: { format: "#,###%" },
			},
		},
		vAxes: {
			0: { title: "Sales" },
			1: {
				title: "Conversion Rate",
				format: "#'%'",
				minValue: 0,
				maxValue: 1,
			},
		},
	};

	var chart = new google.visualization.ComboChart(
		document.getElementById(divId)
	);
	chart.draw(data, options);
}
