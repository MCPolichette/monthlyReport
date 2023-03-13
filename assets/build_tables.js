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
function updateHeaders() {
	document.getElementById("report_merchant_name").innerHTML =
		merchant.name + " Performance";
	document.getElementById("report_merchant_id").innerHTML = merchant.id;
	document.getElementById("primaryMonthTitle").innerHTML =
		merchant.month + "\n" + report.year;
	document.getElementById("priorMonthTitle").innerHTML =
		merchant.month + "\n" + report.previousyear;

	document.getElementById("affiliate_report_button").hidden = false;
}
function buildFirstTable() {
	let table = document.getElementById("performanceSummaryReport");
	table.style.textAlign = "right";
	let numericalData = numberifyAndCalculateDifferences();
	console.log(numericalData);
	build5columns(
		table,
		1,
		"Sales",
		primaryMonth.performanceReport.Sales,
		priorMonth.performanceReport.Sales,
		numericalData.percentageChange.Sales + "%",
		"$" + numericalData.nominalChange.Sales
	);
	build5columns(
		table,
		2,
		"Click_Throughs",
		primaryMonth.performanceReport.Click_Throughs,
		priorMonth.performanceReport.Click_Throughs,
		numericalData.percentageChange.Click_Throughs + "%",
		numericalData.nominalChange.Click_Throughs
	);
	build5columns(
		table,
		3,
		"New Customers",
		primaryMonth.performanceReport.New_Customer_Sales,
		priorMonth.performanceReport.New_Customer_Sales,
		numericalData.percentageChange.New_Customer_Sales + "%",
		numericalData.nominalChange.New_Customer_Sales
	);
	build5columns(
		table,
		4,
		"Commissions",
		primaryMonth.performanceReport.Commissions,
		priorMonth.performanceReport.Commissions,
		numericalData.percentageChange.Commissions + "%",
		"$" + numericalData.nominalChange.Commissions
	);
	build5columns(
		table,
		5,
		"Network_Commissions",
		primaryMonth.performanceReport.Network_Commissions,
		priorMonth.performanceReport.Network_Commissions,
		numericalData.percentageChange.Network_Commissions + "%",
		"$" + numericalData.nominalChange.Network_Commissions
	);
	build5columns(
		table,
		6,
		"Returns",
		primaryMonth.performanceReport.Number_of_Adjustments,
		priorMonth.performanceReport.Number_of_Adjustments,
		numericalData.percentageChange.Number_of_Adjustments + "%",
		numericalData.nominalChange.Number_of_Adjustments
	);
}
function buildAffiliateTable(array) {
	let table = document.getElementById("affiliateSummaryReport");
	table.style.textAlign = "right";
	console.log(array);
	for (let i = 0; i < 10; i++) {
		build9columns(
			table,
			i + 1,
			array[i].Affiliate,
			toUSD(array[i].Sales),
			array[i].salesYOYpercent + "%",
			array[i].Click_Throughs,
			array[i].Click_ThroughsYOYpercent + "%",
			"NA",
			"NA",
			"NA",
			"NA"
		);
	}
	affiliateReportButton.hidden = true;
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
			primaryMonth.performanceReport.Commissions.replaceAll(",", "").replaceAll(
				"$",
				""
			)
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
			priorMonth.performanceReport.Sales.replaceAll(",", "").replaceAll("$", "")
		),
		Click_Throughs: Number(
			priorMonth.performanceReport.Click_Throughs.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		New_Customers: Number(
			priorMonth.performanceReport.New_Customers.replaceAll(",", "").replaceAll(
				"$",
				""
			)
		),
		New_Customer_Sales: Number(
			priorMonth.performanceReport.New_Customer_Sales.replaceAll(
				",",
				""
			).replaceAll("$", "")
		),
		Commissions: Number(
			priorMonth.performanceReport.Commissions.replaceAll(",", "").replaceAll(
				"$",
				""
			)
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
	if (primaryMonthData.Commissions === 0 || priorMonthData.Commissions === 0) {
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
			primaryMonthData.New_Customer_Sales - priorMonthData.New_Customer_Sales
		).toFixed(2),
		Commissions: (
			primaryMonthData.Commissions - priorMonthData.Commissions
		).toFixed(2),
		Network_Commissions: (
			primaryMonthData.Network_Commissions - priorMonthData.Network_Commissions
		).toFixed(2),
		Number_of_Adjustments: (
			primaryMonthData.Number_of_Adjustments -
			priorMonthData.Number_of_Adjustments
		).toFixed(0),
	};

	return { percentageChange, nominalChange };
}
