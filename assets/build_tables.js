function buildRow(table, row, columns) {
	var row = table.insertRow(row);
	for (i = 0; i < columns.length; i++) {
		var cell = (row.insertCell(i).innerHTML = columns[i]);
	}
}

function build2columns(table, row, col1, col2) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
}
function build5columns(table, row, col1, col2, col3, col4, col5) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
	var cell3 = (row.insertCell(2).innerHTML = col3);
	var cell4 = (row.insertCell(3).innerHTML = col4);
	var cell5 = (row.insertCell(4).innerHTML = col5);
}
function build4columns(table, row, col1, col2, col3, col4) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
	var cell3 = (row.insertCell(2).innerHTML = col3);
	var cell4 = (row.insertCell(3).innerHTML = col4);
}
function build9columns(
	table,
	row,
	col1,
	col2,
	col3,
	col4,
	col5,
	col6,
	col7,
	col8,
	col9
) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
	var cell3 = (row.insertCell(2).innerHTML = col3);
	var cell4 = (row.insertCell(3).innerHTML = col4);
	var cell5 = (row.insertCell(4).innerHTML = col5);
	var cell1 = (row.insertCell(5).innerHTML = col6);
	var cell2 = (row.insertCell(6).innerHTML = col7);
	var cell3 = (row.insertCell(7).innerHTML = col8);
	var cell4 = (row.insertCell(8).innerHTML = col9);
}
function add_borders(table_id, column) {
	var table = document.getElementById(table_id);
	var totalRowCount = table.rows.length - 1;
	for (i = 0; i < totalRowCount + 1; i++) {
		table.rows[i].cells[column].style.cssText +=
			"border-left-width :2px;  border-style:solid; border-left-color: #000000";
	}
}
function tableHeaders(tableID, array) {
	let table = document.getElementById(tableID);
	let thead = document.createElement("thead");
	table.appendChild(thead);
	for (var i = 0; i < array.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(array[i]));
	}
}
function updateHeaders() {
	document.getElementById("merchantCard").innerHTML = merchant.name;
	document.getElementById("merchantCardId").innerHTML = "ID: " + merchant.id;
	document.getElementById("merchantCardMonth1").innerHTML =
		data.month + " " + report.year;

	document.getElementById("report_merchant_name").innerHTML =
		merchant.name +
		" - ID: " +
		merchant.id +
		" - Performance Report - " +
		report.month +
		" " +
		report.year;

	// document.getElementById("affiliate_report_button").hidden = false;
}

// !? REVIEW and REMOVE
// function buildGrowingTable() {
// 	let x = new Array();
// 	for (let j = 0; j < primaryMonth.affiliateReport.length; j++) {
// 		if (
// 			primaryMonth.affiliateReport[j].salesYOYpercent === 0 ||
// 			primaryMonth.affiliateReport[j].salesYOYpercent === 1 ||
// 			primaryMonth.affiliateReport[j].salesYOYpercent == Infinity
// 		) {
// 			console.log("1 or 0");
// 		} else if (isFinite(primaryMonth.affiliateReport[j].salesYOYpercent)) {
// 			report.GrowingPerformancebyYoyPercent.push(
// 				primaryMonth.affiliateReport[j]
// 			);
// 		}
// 	}
// 	report.GrowingPerformancebyYoyPercent.sort(
// 		(a, b) => parseFloat(b.salesYOYpercent) - parseFloat(a.salesYOYpercent)
// 	);

// 	let growingTable = document.getElementById("growing_report");
// 	let gHeaders = [
// 		"Affiliate",
// 		"Sales " + merchant.abMonth + " " + report.year,
// 		"Sales " + merchant.abMonth + " " + report.previousyear,
// 		"YoY %",
// 	];

// 	tableHeaders("growing_report", gHeaders);
// 	for (let i = 0; i < 4; i++) {
// 		build4columns(
// 			growingTable,
// 			i,
// 			report.GrowingPerformancebyYoyPercent[i].Affiliate,
// 			toUSD(report.GrowingPerformancebyYoyPercent[i].Sales),
// 			toUSD(report.GrowingPerformancebyYoyPercent[i].lySales),
// 			(
// 				report.GrowingPerformancebyYoyPercent[i].salesYOYpercent * 100
// 			).toFixed(2) + "%"
// 		);
// 	}
// 	decliningTableBuild(report.GrowingPerformancebyYoyPercent);
// }
// function decliningTableBuild(x) {
// 	let decliningTable = document.getElementById("declining_report");
// 	let dHeaders = [
// 		"Affiliate",
// 		"Sales " + merchant.abMonth + " " + report.year,
// 		"Sales " + merchant.abMonth + " " + report.previousyear,
// 		"YoY %",
// 	];
// 	tableHeaders("declining_report", dHeaders);
// 	x.reverse();
// 	console.log(x);
// 	for (let i = 0; i < 4; i++) {
// 		build4columns(
// 			decliningTable,
// 			i,
// 			x[i].Affiliate,
// 			toUSD(x[i].Sales),
// 			toUSD(x[i].lySales),
// 			(x[i].salesYOYpercent * 100).toFixed(2) + "%"
// 		);
// 	}
// }

function buildQuickStatsTable() {
	let table = document.getElementById("quickStats");
	let thead = document.getElementById("qstatsHead");
	let summaryHeadersArray = [
		" ",
		data.monthlyPerformanceSummary[0].Month,
		"change YOY",

		"%change YOY",
		"",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}

	function dollarRowValues(text, m1, m2, x) {
		let posOrNeg = icons.up + "  +";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);

		if (value < 0) {
			posOrNeg = icons.down + "  ";
		}
		return [text, toUSD(m1), toUSD(value), percent + "%", posOrNeg];
	}
	function otherRowValues(text, m1, m2, x) {
		let icon = icons.up;
		let posOrNeg = "+";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);
		if (value < 0) {
			icon = icons.down;
			posOrNeg = "";
		}
		if (text === "Conversion Rate") {
			m1 = m1 + "%";
			value = value.toFixed(2) + "%";
		}
		return [text, m1, posOrNeg + value, posOrNeg + percent + "%", icon];
	}
	console.log(data.monthlyPerformanceSummary);
	let yoydifferences = {
		Sales: dollarRowValues(
			"Sales",
			data.monthlyPerformanceSummary[0].Sales,
			data.monthlyPerformanceSummary[12].Sales
		),
		Mobile_Sales: dollarRowValues(
			"Mobile Sales",
			data.monthlyPerformanceSummary[0].Mobile_Sales,
			data.monthlyPerformanceSummary[12].Mobile_Sales
		),
		Click_Throughs: otherRowValues(
			"Click Throughs",
			data.monthlyPerformanceSummary[0].Click_Throughs,
			data.monthlyPerformanceSummary[12].Click_Throughs
		),
		Average_Sale_Amount: dollarRowValues(
			"Avg Sale Amount",
			data.monthlyPerformanceSummary[0].Average_Sale_Amount,
			data.monthlyPerformanceSummary[12].Average_Sale_Amount
		),
		Conversion_Rate: otherRowValues(
			"Conversion Rate",
			data.monthlyPerformanceSummary[0].Conversion_Rate,
			data.monthlyPerformanceSummary[12].Conversion_Rate
		),
	};

	console.log(yoydifferences);
	table.style.textAlign = "right";
	buildRow(table, 0, yoydifferences.Sales);
	buildRow(table, 1, yoydifferences.Mobile_Sales);
	buildRow(table, 2, yoydifferences.Click_Throughs);
	buildRow(table, 3, yoydifferences.Average_Sale_Amount);
	buildRow(table, 4, yoydifferences.Conversion_Rate);
}
function buildYoyTable() {
	let table = document.getElementById("yoySummaryReport");
	let thead = document.getElementById("yoySummaryTHead");
	let summaryHeadersArray = [
		" ",
		data.monthlyPerformanceSummary[0].Month,
		data.monthlyPerformanceSummary[12].Month,

		"% Change",
		"",
		"Nominal Change",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}

	function dollarRowValues(text, m1, m2, x) {
		let icon = icons.up;
		let posOrNeg = "+";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);

		if (value < 0) {
			posOrNeg = icons.down + "  ";
			icon = icons.down;
			posOrNeg = "";
		}
		return [
			text,
			toUSD(m1),
			toUSD(m2),
			percent + "%",
			icon,
			posOrNeg + toUSD(value),
		];
	}
	function otherRowValues(text, m1, m2, x) {
		let icon = icons.up;
		let posOrNeg = "+";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);
		if (value < 0) {
			icon = icons.down;
			posOrNeg = "";
		}
		if (text === "Conversion Rate") {
			m1 = m1 + "%";
			m2 = m2 + "%";
			value = value.toFixed(2) + "%";
		}
		return [text, m1, m2, percent + "%", icon, posOrNeg + value];
	}
	console.log(data.monthlyPerformanceSummary);
	let yoydifferences = {
		Sales: dollarRowValues(
			"Sales",
			data.monthlyPerformanceSummary[0].Sales,
			data.monthlyPerformanceSummary[12].Sales
		),
		Number_of_Sales: dollarRowValues(
			"# of Sales",
			data.monthlyPerformanceSummary[0].Number_of_Sales,
			data.monthlyPerformanceSummary[12].Number_of_Sales
		),
		Mobile_Sales: dollarRowValues(
			"Mobile Sales",
			data.monthlyPerformanceSummary[0].Mobile_Sales,
			data.monthlyPerformanceSummary[12].Mobile_Sales
		),
		Click_Throughs: otherRowValues(
			"Click Throughs",
			data.monthlyPerformanceSummary[0].Click_Throughs,
			data.monthlyPerformanceSummary[12].Click_Throughs
		),
		Average_Sale_Amount: dollarRowValues(
			"Avg Sale Amount",
			data.monthlyPerformanceSummary[0].Average_Sale_Amount,
			data.monthlyPerformanceSummary[12].Average_Sale_Amount
		),
		Conversion_Rate: otherRowValues(
			"Conversion Rate",
			data.monthlyPerformanceSummary[0].Conversion_Rate,
			data.monthlyPerformanceSummary[12].Conversion_Rate
		),
		Ad_Impressions: otherRowValues(
			"Ad Impressions",
			data.monthlyPerformanceSummary[0].Ad_Impressions,
			data.monthlyPerformanceSummary[12].Ad_Impressions
		),
		Number_of_Mobile_Sales: otherRowValues(
			"# of Mobile Sales",
			data.monthlyPerformanceSummary[0].Number_of_Mobile_Sales,
			data.monthlyPerformanceSummary[12].Number_of_Mobile_Sales
		),
	};

	table.style.textAlign = "right";
	buildRow(table, 0, yoydifferences.Ad_Impressions);
	buildRow(table, 1, yoydifferences.Click_Throughs);
	buildRow(table, 2, yoydifferences.Sales);
	buildRow(table, 3, yoydifferences.Number_of_Sales);
	buildRow(table, 4, yoydifferences.Mobile_Sales);
	buildRow(table, 5, yoydifferences.Number_of_Mobile_Sales);
	buildRow(table, 6, yoydifferences.Average_Sale_Amount);
	buildRow(table, 7, yoydifferences.Conversion_Rate);
}
function buildMomTable() {
	let table = document.getElementById("momSummaryReport");
	let thead = document.getElementById("momSummaryTHead");
	let summaryHeadersArray = [
		" ",
		data.monthlyPerformanceSummary[0].Month,
		data.monthlyPerformanceSummary[12].Month,

		"% Change",
		"",
		"Nominal Change",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}

	function dollarRowValues(text, m1, m2, x) {
		let icon = icons.up;
		let posOrNeg = "+";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);

		if (value < 0) {
			posOrNeg = icons.down;
			icon = icons.down;
			posOrNeg = "";
		}
		return [
			text,
			toUSD(m1),
			toUSD(m2),
			percent + "%",
			icon,
			posOrNeg + toUSD(value),
		];
	}
	function otherRowValues(text, m1, m2, x) {
		let icon = icons.up;
		let posOrNeg = "+";
		let value = m1 - m2;
		let percent = ((m1 - m2) / m1).toFixed(2);
		if (value < 0) {
			icon = icons.down;
			posOrNeg = "";
		}
		if (text === "Conversion Rate") {
			m1 = m1 + "%";
			m2 = m2 + "%";
			value = value.toFixed(2) + "%";
		}
		return [text, m1, m2, percent + "%", icon, posOrNeg + value];
	}
	console.log(data.monthlyPerformanceSummary);
	let momdifferences = {
		Sales: dollarRowValues(
			"Sales",
			data.monthlyPerformanceSummary[0].Sales,
			data.monthlyPerformanceSummary[1].Sales
		),
		Number_of_Sales: dollarRowValues(
			"# of Sales",
			data.monthlyPerformanceSummary[0].Number_of_Sales,
			data.monthlyPerformanceSummary[1].Number_of_Sales
		),
		Mobile_Sales: dollarRowValues(
			"Mobile Sales",
			data.monthlyPerformanceSummary[0].Mobile_Sales,
			data.monthlyPerformanceSummary[1].Mobile_Sales
		),
		Click_Throughs: otherRowValues(
			"Click Throughs",
			data.monthlyPerformanceSummary[0].Click_Throughs,
			data.monthlyPerformanceSummary[1].Click_Throughs
		),
		Average_Sale_Amount: dollarRowValues(
			"Avg Sale Amount",
			data.monthlyPerformanceSummary[0].Average_Sale_Amount,
			data.monthlyPerformanceSummary[1].Average_Sale_Amount
		),
		Conversion_Rate: otherRowValues(
			"Conversion Rate",
			data.monthlyPerformanceSummary[0].Conversion_Rate,
			data.monthlyPerformanceSummary[1].Conversion_Rate
		),
		Ad_Impressions: otherRowValues(
			"Ad Impressions",
			data.monthlyPerformanceSummary[0].Ad_Impressions,
			data.monthlyPerformanceSummary[1].Ad_Impressions
		),
		Number_of_Mobile_Sales: otherRowValues(
			"# of Mobile Sales",
			data.monthlyPerformanceSummary[0].Number_of_Mobile_Sales,
			data.monthlyPerformanceSummary[1].Number_of_Mobile_Sales
		),
	};

	table.style.textAlign = "right";
	buildRow(table, 0, momdifferences.Ad_Impressions);
	buildRow(table, 1, momdifferences.Click_Throughs);
	buildRow(table, 2, momdifferences.Sales);
	buildRow(table, 3, momdifferences.Number_of_Sales);
	buildRow(table, 4, momdifferences.Mobile_Sales);
	buildRow(table, 5, momdifferences.Number_of_Mobile_Sales);
	buildRow(table, 6, momdifferences.Average_Sale_Amount);
	buildRow(table, 7, momdifferences.Conversion_Rate);
}

function buildAffiliateTable(array) {
	let table = document.getElementById("affiliateSummaryReport");
	let thead = document.getElementById("affTableTHead");
	let headArray = [
		"Affiliate",
		data.abMonth + " " + report.year + " Sales",
		"YoY %",
		data.abMonth + " " + report.year + " Clicks",
		"YoY %",
		data.abMonth + " " + report.year + " TotalSpend",
		"YoY %",
		data.abMonth + " " + report.year + " ROAS",
		"YoY %",
	];
	for (var i = 0; i < headArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[i]));
	}
	table.style.textAlign = "right";
	for (let i = 0; i < report.topAffiliateCount; i++) {
		build9columns(
			table,
			i,
			array[i].Affiliate,
			toUSD(array[i].Sales),
			(array[i].salesYOYpercent * 100).toFixed(2) + "%",
			array[i].Click_Throughs,
			(array[i].Click_ThroughsYOYpercent * 100).toFixed(2) + "%",
			toUSD(array[i].Total_Commission.toFixed(2)),
			(array[i].totalCommissionYOYPercent * 100).toFixed(2) + "%",
			toUSD(array[i].roa.toFixed(2)),
			(array[i].roaroaYOYPercent * 100).toFixed(2) + "%"
		);
	}
	add_borders("affiliateSummaryReport", 3);
	add_borders("affiliateSummaryReport", 5);
	add_borders("affiliateSummaryReport", 7);

	affiliateReportButton.disabled = true;
}

// !? FOR REFERENCE - DELETE LATER

// function numberifyAndCalculateDifferences() {
// 	let primaryMonthData = {
// 		Sales: Number(
// 			primaryMonth.performanceReport.Sales.replaceAll(",", "").replaceAll(
// 				"$",
// 				""
// 			)
// 		),
// 		Click_Throughs: Number(
// 			primaryMonth.performanceReport.Click_Throughs.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		New_Customers: Number(
// 			primaryMonth.performanceReport.New_Customers.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		New_Customer_Sales: Number(
// 			primaryMonth.performanceReport.New_Customer_Sales.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Commissions: Number(
// 			primaryMonth.performanceReport.Commissions.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Network_Commissions: Number(
// 			primaryMonth.performanceReport.Network_Commissions.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Number_of_Adjustments: Number(
// 			primaryMonth.performanceReport.Number_of_Adjustments.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 	};
// 	let priorMonthData = {
// 		Sales: Number(
// 			priorMonth.performanceReport.Sales.replaceAll(",", "").replaceAll(
// 				"$",
// 				""
// 			)
// 		),
// 		Click_Throughs: Number(
// 			priorMonth.performanceReport.Click_Throughs.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		New_Customers: Number(
// 			priorMonth.performanceReport.New_Customers.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		New_Customer_Sales: Number(
// 			priorMonth.performanceReport.New_Customer_Sales.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Commissions: Number(
// 			priorMonth.performanceReport.Commissions.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Network_Commissions: Number(
// 			priorMonth.performanceReport.Network_Commissions.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 		Number_of_Adjustments: Number(
// 			priorMonth.performanceReport.Number_of_Adjustments.replaceAll(
// 				",",
// 				""
// 			).replaceAll("$", "")
// 		),
// 	};
// 	let percentageChange = {};
// 	if (primaryMonthData.Sales === 0 || priorMonthData.Sales === 0) {
// 		percentageChange.Sales = "N / A";
// 	} else {
// 		percentageChange.Sales = (
// 			(primaryMonthData.Sales - priorMonthData.Sales) /
// 			primaryMonthData.Sales
// 		).toFixed(2);
// 	}
// 	if (
// 		primaryMonthData.Click_Throughs === 0 ||
// 		priorMonthData.Click_Throughs === 0
// 	) {
// 		percentageChange.Click_Throughs = "N / A";
// 	} else {
// 		percentageChange.Click_Throughs = (
// 			(primaryMonthData.Click_Throughs - priorMonthData.Click_Throughs) /
// 			primaryMonthData.Click_Throughs
// 		).toFixed(2);
// 	}
// 	if (
// 		primaryMonthData.New_Customer_Sales === 0 ||
// 		priorMonthData.New_Customer_Sales === 0
// 	) {
// 		percentageChange.New_Customer_Sales = "N / A";
// 	} else {
// 		percentageChange.New_Customer_Sales = (
// 			(primaryMonthData.New_Customer_Sales -
// 				priorMonthData.New_Customer_Sales) /
// 			primaryMonthData.New_Customer_Sales
// 		).toFixed(2);
// 	}
// 	if (
// 		primaryMonthData.Commissions === 0 ||
// 		priorMonthData.Commissions === 0
// 	) {
// 		percentageChange.Commissions = "N / A";
// 	} else {
// 		percentageChange.Commissions = (
// 			(primaryMonthData.Commissions - priorMonthData.Commissions) /
// 			primaryMonthData.Commissions
// 		).toFixed(2);
// 	}
// 	if (
// 		primaryMonthData.Network_Commissions === 0 ||
// 		priorMonthData.Network_Commissions === 0
// 	) {
// 		percentageChange.Network_Commissions = "N / A";
// 	} else {
// 		percentageChange.Network_Commissions = (
// 			(primaryMonthData.Network_Commissions -
// 				priorMonthData.Network_Commissions) /
// 			primaryMonthData.Network_Commissions
// 		).toFixed(2);
// 	}
// 	if (
// 		primaryMonthData.Number_of_Adjustments === 0 ||
// 		priorMonthData.Number_of_Adjustments === 0
// 	) {
// 		percentageChange.Number_of_Adjustments = "N / A";
// 	} else {
// 		percentageChange.Number_of_Adjustments = (
// 			(primaryMonthData.Number_of_Adjustments -
// 				priorMonthData.Number_of_Adjustments) /
// 			primaryMonthData.Number_of_Adjustments
// 		).toFixed(2);
// 	}
// 	let nominalChange = {
// 		Sales: (primaryMonthData.Sales - priorMonthData.Sales).toFixed(2),
// 		Click_Throughs: (
// 			primaryMonthData.Click_Throughs - priorMonthData.Click_Throughs
// 		).toFixed(0),
// 		New_Customer_Sales: (
// 			primaryMonthData.New_Customer_Sales -
// 			priorMonthData.New_Customer_Sales
// 		).toFixed(2),
// 		Commissions: (
// 			primaryMonthData.Commissions - priorMonthData.Commissions
// 		).toFixed(2),
// 		Network_Commissions: (
// 			primaryMonthData.Network_Commissions -
// 			priorMonthData.Network_Commissions
// 		).toFixed(2),
// 		Number_of_Adjustments: (
// 			primaryMonthData.Number_of_Adjustments -
// 			priorMonthData.Number_of_Adjustments
// 		).toFixed(0),
// 	};
// 	return { percentageChange, nominalChange };
// }
