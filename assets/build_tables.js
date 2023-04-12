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
		merchant.month + " " + report.year;
	document.getElementById("merchantCardMonth2").innerHTML =
		merchant.month + " " + report.previousyear;
	document.getElementById("report_merchant_name").innerHTML =
		merchant.name +
		" - ID: " +
		merchant.id +
		" - Performance Report - " +
		merchant.month +
		" " +
		report.year;

	// document.getElementById("affiliate_report_button").hidden = false;
}
function build_products_sold_table() {
	let table = document.getElementById("productsSoldReport");
	let thead = document.getElementById("productTHead");
	let headArray = [
		"Products SKU",
		"Product Name",
		"Total Sales count ",
		"Mobile Sales Count",
		"Total Sales Amount",
	];
	for (var i = 0; i < headArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[i]));
	}
	// table.style.textAlign = "right";
	for (let i = 0; i < report.productList.length; i++) {
		build5columns(
			table,
			[i],
			report.productList[i].Product_SKU,
			report.productList[i].Product_Name,
			report.productList[i].Sale_Count,
			report.productList[i].Mobile_Sale_Count,
			report.productList[i].Total_Product_Sale_Amount
		);
	}
}
function buildGrowingTable() {
	let x = new Array();
	for (let j = 0; j < primaryMonth.affiliateReport.length; j++) {
		if (
			primaryMonth.affiliateReport[j].salesYOYpercent === 0 ||
			primaryMonth.affiliateReport[j].salesYOYpercent === 1 ||
			primaryMonth.affiliateReport[j].salesYOYpercent == Infinity
		) {
			console.log("1 or 0");
		} else if (isFinite(primaryMonth.affiliateReport[j].salesYOYpercent)) {
			report.GrowingPerformancebyYoyPercent.push(
				primaryMonth.affiliateReport[j]
			);
		}
	}
	report.GrowingPerformancebyYoyPercent.sort(
		(a, b) => parseFloat(b.salesYOYpercent) - parseFloat(a.salesYOYpercent)
	);

	let growingTable = document.getElementById("growing_report");
	let gHeaders = [
		"Affiliate",
		"Sales " + merchant.abMonth + " " + report.year,
		"Sales " + merchant.abMonth + " " + report.previousyear,
		"YoY %",
	];

	tableHeaders("growing_report", gHeaders);
	for (let i = 0; i < 4; i++) {
		build4columns(
			growingTable,
			i,
			report.GrowingPerformancebyYoyPercent[i].Affiliate,
			toUSD(report.GrowingPerformancebyYoyPercent[i].Sales),
			toUSD(report.GrowingPerformancebyYoyPercent[i].lySales),
			(
				report.GrowingPerformancebyYoyPercent[i].salesYOYpercent * 100
			).toFixed(2) + "%"
		);
	}
	decliningTableBuild(report.GrowingPerformancebyYoyPercent);
}
function decliningTableBuild(x) {
	let decliningTable = document.getElementById("declining_report");
	let dHeaders = [
		"Affiliate",
		"Sales " + merchant.abMonth + " " + report.year,
		"Sales " + merchant.abMonth + " " + report.previousyear,
		"YoY %",
	];
	tableHeaders("declining_report", dHeaders);
	x.reverse();
	console.log(x);
	for (let i = 0; i < 4; i++) {
		build4columns(
			decliningTable,
			i,
			x[i].Affiliate,
			toUSD(x[i].Sales),
			toUSD(x[i].lySales),
			(x[i].salesYOYpercent * 100).toFixed(2) + "%"
		);
	}
}
function buildNewPerformersTable() {
	let table = document.getElementById("newPartnerReport");
	table.style.textAlign = "right";
	let month1Total = 0;
	let month2Total = 0;
	let month3Total = 0;
	for (let i = 0; i < primaryMonth.affiliateReport.length; i++) {
		for (let j = 0; j < report.newAffsMonth1.length; j++) {
			if (
				report.newAffsMonth1[j] ===
				primaryMonth.affiliateReport[i].Affiliate_Id
			) {
				month1Total =
					month1Total + primaryMonth.affiliateReport[i].Sales;
			}
		}
		for (let k = 0; k < report.newAffsMonth2.length; k++) {
			if (
				report.newAffsMonth2[k] ===
				primaryMonth.affiliateReport[i].Affiliate_Id
			) {
				month2Total =
					month2Total + primaryMonth.affiliateReport[i].Sales;
			}
		}
		for (let l = 0; l < report.newAffsMonth3.length; l++) {
			if (
				report.newAffsMonth3[l] ===
				primaryMonth.affiliateReport[i].Affiliate_Id
			) {
				month3Total =
					month3Total + primaryMonth.affiliateReport[i].Sales;
			}
		}
	}
	console.log(month3Total);
	build4columns(
		table,
		1,
		merchant.month + " " + report.year,
		report.newAffsMonth1.length,
		toUSD(month1Total),
		"(insert text input-field)"
	);
	build4columns(
		table,
		2,
		merchant.previousMonth,
		report.newAffsMonth2.length,
		toUSD(month2Total),
		"(insert text input-field)"
	);
	build4columns(
		table,
		3,
		merchant.twoMonthsAgo,
		report.newAffsMonth3.length,
		toUSD(month3Total),
		"(insert text input-field)"
	);
}
// // NOT SURE IF RELEVANT  TABLE BUILD IS MOSTLY A COPY - COME BACK TO THIS
function buildQuickStatsTable() {
	let table = document.getElementById("quickStats");
	let thead = document.getElementById("qstatsHead");
	let summaryHeadersArray = [
		" ",
		merchant.month + " " + report.year,
		"&Delta YOY",
		"% &Delta YOY",
		"% of Total",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}
	// 	table.style.textAlign = "right";
	// 	let numericalData = numberifyAndCalculateDifferences();
	// 	console.log(numericalData);
	// 	build5columns(
	// 		table,
	// 		0,
	// 		"Sales",
	// 		primaryMonth.performanceReport.Sales,
	// 		priorMonth.performanceReport.Sales,
	// 		(numericalData.percentageChange.Sales * 100).toFixed(2) + "%",
	// 		"$" + numericalData.nominalChange.Sales
	// 	);
	// 	build5columns(
	// 		table,
	// 		1,
	// 		"Click_Throughs",
	// 		primaryMonth.performanceReport.Click_Throughs,
	// 		priorMonth.performanceReport.Click_Throughs,
	// 		(numericalData.percentageChange.Click_Throughs * 100).toFixed(2) + "%",
	// 		numericalData.nominalChange.Click_Throughs
	// 	);
	// 	build5columns(
	// 		table,
	// 		2,
	// 		"New Customer Sales",
	// 		primaryMonth.performanceReport.New_Customer_Sales,
	// 		priorMonth.performanceReport.New_Customer_Sales,
	// 		(numericalData.percentageChange.New_Customer_Sales * 100).toFixed(2) +
	// 			"%",
	// 		numericalData.nominalChange.New_Customer_Sales
	// 	);
	// 	build5columns(
	// 		table,
	// 		3,
	// 		"Commissions",
	// 		primaryMonth.performanceReport.Commissions,
	// 		priorMonth.performanceReport.Commissions,
	// 		(numericalData.percentageChange.Commissions * 100).toFixed(2) + "%",
	// 		"$" + numericalData.nominalChange.Commissions
	// 	);
	// 	build5columns(
	// 		table,
	// 		4,
	// 		"Network_Commissions",
	// 		primaryMonth.performanceReport.Network_Commissions,
	// 		priorMonth.performanceReport.Network_Commissions,
	// 		(numericalData.percentageChange.Network_Commissions * 100).toFixed(2) +
	// 			"%",
	// 		"$" + numericalData.nominalChange.Network_Commissions
	// 	);
	// 	build5columns(
	// 		table,
	// 		5,
	// 		"Returns / Adjustments",
	// 		primaryMonth.performanceReport.Number_of_Adjustments,
	// 		priorMonth.performanceReport.Number_of_Adjustments,
	// 		(numericalData.percentageChange.Number_of_Adjustments * 100).toFixed(
	// 			2
	// 		) + "%",
	// 		numericalData.nominalChange.Number_of_Adjustments
	// 	);
}
function buildFirstTable() {
	let table = document.getElementById("performanceSummaryReport");
	let thead = document.getElementById("primaryTHead");
	let summaryHeadersArray = [
		" ",
		merchant.month + "\n" + report.year,
		merchant.month + "\n" + report.previousyear,
		"Percentage Change",
		"Nominal Change",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}
	table.style.textAlign = "right";
	let numericalData = numberifyAndCalculateDifferences();
	console.log(numericalData);
	build5columns(
		table,
		0,
		"Sales",
		primaryMonth.performanceReport.Sales,
		priorMonth.performanceReport.Sales,
		(numericalData.percentageChange.Sales * 100).toFixed(2) + "%",
		"$" + numericalData.nominalChange.Sales
	);
	build5columns(
		table,
		1,
		"Click_Throughs",
		primaryMonth.performanceReport.Click_Throughs,
		priorMonth.performanceReport.Click_Throughs,
		(numericalData.percentageChange.Click_Throughs * 100).toFixed(2) + "%",
		numericalData.nominalChange.Click_Throughs
	);
	build5columns(
		table,
		2,
		"New Customer Sales",
		primaryMonth.performanceReport.New_Customer_Sales,
		priorMonth.performanceReport.New_Customer_Sales,
		(numericalData.percentageChange.New_Customer_Sales * 100).toFixed(2) +
			"%",
		numericalData.nominalChange.New_Customer_Sales
	);
	build5columns(
		table,
		3,
		"Commissions",
		primaryMonth.performanceReport.Commissions,
		priorMonth.performanceReport.Commissions,
		(numericalData.percentageChange.Commissions * 100).toFixed(2) + "%",
		"$" + numericalData.nominalChange.Commissions
	);
	build5columns(
		table,
		4,
		"Network_Commissions",
		primaryMonth.performanceReport.Network_Commissions,
		priorMonth.performanceReport.Network_Commissions,
		(numericalData.percentageChange.Network_Commissions * 100).toFixed(2) +
			"%",
		"$" + numericalData.nominalChange.Network_Commissions
	);
	build5columns(
		table,
		5,
		"Returns / Adjustments",
		primaryMonth.performanceReport.Number_of_Adjustments,
		priorMonth.performanceReport.Number_of_Adjustments,
		(numericalData.percentageChange.Number_of_Adjustments * 100).toFixed(
			2
		) + "%",
		numericalData.nominalChange.Number_of_Adjustments
	);
}
function buildAffiliateTable(array) {
	let table = document.getElementById("affiliateSummaryReport");
	let thead = document.getElementById("affTableTHead");
	let headArray = [
		"Affiliate",
		merchant.abMonth + " " + report.year + " Sales",
		"YoY %",
		merchant.abMonth + " " + report.year + " Clicks",
		"YoY %",
		merchant.abMonth + " " + report.year + " TotalSpend",
		"YoY %",
		merchant.abMonth + " " + report.year + " ROAS",
		"YoY %",
	];
	for (var i = 0; i < headArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[i]));
	}
	table.style.textAlign = "right";
	for (let i = 0; i < 10; i++) {
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
	buildGrowingTable();
	add_borders("affiliateSummaryReport", 3);
	add_borders("affiliateSummaryReport", 5);
	add_borders("affiliateSummaryReport", 7);

	affiliateReportButton.disabled = true;
}
function numberifyAndCalculateDifferences() {
	let primaryMonthData = {
		Sales: Number(
			primaryMonth.performanceReport.Sales.replaceAll(",", "").replaceAll(
				"$",
				""
			)
		),
		Click_Throughs: Number(
			primaryMonth.performanceReport.Click_Throughs.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		New_Customers: Number(
			primaryMonth.performanceReport.New_Customers.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		New_Customer_Sales: Number(
			primaryMonth.performanceReport.New_Customer_Sales.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Commissions: Number(
			primaryMonth.performanceReport.Commissions.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Network_Commissions: Number(
			primaryMonth.performanceReport.Network_Commissions.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Number_of_Adjustments: Number(
			primaryMonth.performanceReport.Number_of_Adjustments.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
	};
	let priorMonthData = {
		Sales: Number(
			priorMonth.performanceReport.Sales.replaceAll(",", "").replaceAll(
				"$",
				""
			)
		),
		Click_Throughs: Number(
			priorMonth.performanceReport.Click_Throughs.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		New_Customers: Number(
			priorMonth.performanceReport.New_Customers.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		New_Customer_Sales: Number(
			priorMonth.performanceReport.New_Customer_Sales.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Commissions: Number(
			priorMonth.performanceReport.Commissions.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Network_Commissions: Number(
			priorMonth.performanceReport.Network_Commissions.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Number_of_Adjustments: Number(
			priorMonth.performanceReport.Number_of_Adjustments.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
	};
	let percentageChange = {};
	if (primaryMonthData.Sales === 0 || priorMonthData.Sales === 0) {
		percentageChange.Sales = "N / A";
	} else {
		percentageChange.Sales = (
			(primaryMonthData.Sales - priorMonthData.Sales) /
			primaryMonthData.Sales
		).toFixed(2);
	}
	if (
		primaryMonthData.Click_Throughs === 0 ||
		priorMonthData.Click_Throughs === 0
	) {
		percentageChange.Click_Throughs = "N / A";
	} else {
		percentageChange.Click_Throughs = (
			(primaryMonthData.Click_Throughs - priorMonthData.Click_Throughs) /
			primaryMonthData.Click_Throughs
		).toFixed(2);
	}
	if (
		primaryMonthData.New_Customer_Sales === 0 ||
		priorMonthData.New_Customer_Sales === 0
	) {
		percentageChange.New_Customer_Sales = "N / A";
	} else {
		percentageChange.New_Customer_Sales = (
			(primaryMonthData.New_Customer_Sales -
				priorMonthData.New_Customer_Sales) /
			primaryMonthData.New_Customer_Sales
		).toFixed(2);
	}
	if (
		primaryMonthData.Commissions === 0 ||
		priorMonthData.Commissions === 0
	) {
		percentageChange.Commissions = "N / A";
	} else {
		percentageChange.Commissions = (
			(primaryMonthData.Commissions - priorMonthData.Commissions) /
			primaryMonthData.Commissions
		).toFixed(2);
	}
	if (
		primaryMonthData.Network_Commissions === 0 ||
		priorMonthData.Network_Commissions === 0
	) {
		percentageChange.Network_Commissions = "N / A";
	} else {
		percentageChange.Network_Commissions = (
			(primaryMonthData.Network_Commissions -
				priorMonthData.Network_Commissions) /
			primaryMonthData.Network_Commissions
		).toFixed(2);
	}
	if (
		primaryMonthData.Number_of_Adjustments === 0 ||
		priorMonthData.Number_of_Adjustments === 0
	) {
		percentageChange.Number_of_Adjustments = "N / A";
	} else {
		percentageChange.Number_of_Adjustments = (
			(primaryMonthData.Number_of_Adjustments -
				priorMonthData.Number_of_Adjustments) /
			primaryMonthData.Number_of_Adjustments
		).toFixed(2);
	}
	let nominalChange = {
		Sales: (primaryMonthData.Sales - priorMonthData.Sales).toFixed(2),
		Click_Throughs: (
			primaryMonthData.Click_Throughs - priorMonthData.Click_Throughs
		).toFixed(0),
		New_Customer_Sales: (
			primaryMonthData.New_Customer_Sales -
			priorMonthData.New_Customer_Sales
		).toFixed(2),
		Commissions: (
			primaryMonthData.Commissions - priorMonthData.Commissions
		).toFixed(2),
		Network_Commissions: (
			primaryMonthData.Network_Commissions -
			priorMonthData.Network_Commissions
		).toFixed(2),
		Number_of_Adjustments: (
			primaryMonthData.Number_of_Adjustments -
			priorMonthData.Number_of_Adjustments
		).toFixed(0),
	};
	return { percentageChange, nominalChange };
}
