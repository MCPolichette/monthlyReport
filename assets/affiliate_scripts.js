function displayNewAffiliates(array, id) {
	document.getElementById(id).innerHTML = "";
	for (j = 0; j < array.length; j++) {
		let affiliateButton = document.createElement("button");
		let x = array[j];
		affiliateButton.innerHTML = x;
		affiliateButton.classList = "btn btn-primary";
		affiliateButton.addEventListener(
			"click",
			function () {
				let y = array.indexOf(x);
				console.log(j, x, y, array[j]);
				array.splice(y, 1);
				displayNewAffiliates(array, id);
			},
			false,
			false
		);
		document.getElementById(id).appendChild(affiliateButton);
	}
}
function addAffiliate(affiliate, array, id, clearId) {
	if (array.includes(affiliate)) {
		alert("already added this Affiliate");
	} else {
		console.log(affiliate, array);
		for (i = 0; i < primaryMonth.affiliateReport.length; i++) {
			console.log(primaryMonth.affiliateReport[i].Affiliate_Id, i);
			if (affiliate === primaryMonth.affiliateReport[i].Affiliate_Id) {
				array.push(affiliate);
				console.log(affiliate, array, id);
				displayNewAffiliates(array, id, affiliate);
			}
		}
	}
	document.getElementById(clearId).value = "";
}
function addNotableAffiliate(ID, row) {
	console.log(ID, row);
	if (document.getElementById(ID).checked) {
		switch (row) {
			case 1:
				data.notablePerformers.one.push(ID);
				break;
			case 2:
				data.notablePerformers.two.push(ID);
				break;
			case 3:
				data.notablePerformers.three.push(ID);
				break;
		}
	} else {
		let x = 0;
		switch (row) {
			case 1:
				x = data.notablePerformers.one.indexOf(ID);
				data.notablePerformers.one.splice(x);
				break;
			case 2:
				x = data.notablePerformers.two.indexOf(ID);
				data.notablePerformers.two.splice(x);
				break;
			case 3:
				x = data.notablePerformers.three.indexOf(ID);
				data.notablePerformers.three.splice(x);
				break;
		}
	}
	console.log(data.notablePerformers);
}
function updateNotablePerformers() {
	let oneTable = document.createElement("table");
	let x = [];
	const oneTopRow = document.createElement("thead");
	oneTable.appendChild(oneTopRow);
	oneTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Affiliate"));
	oneTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Sales"));
	oneTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Number Of Sales"));
	oneTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Conversion Rate"));

	for (l = 0; l < data.notablePerformers.one.length; l++) {
		for (m = 0; m < primaryMonth.affiliateReport.length; m++) {
			if (
				data.notablePerformers.one[l] ===
				primaryMonth.affiliateReport[m].Affiliate_Id
			) {
				buildRow(oneTable, i, [
					primaryMonth.affiliateReport[m].Affiliate,
					primaryMonth.affiliateReport[m].Sales,
					primaryMonth.affiliateReport[m].Number_of_Sales,
					primaryMonth.affiliateReport[m].Conversion_Rate,
				]);
			}
		}
	}
	updateTableCell("newPartnerReport", 1, 2, oneTable);

	let twoTable = document.createElement("table");
	const twoTopRow = document.createElement("thead");
	twoTable.appendChild(twoTopRow);
	twoTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Affiliate"));
	twoTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Sales"));
	twoTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Number Of Sales"));
	twoTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Conversion Rate"));
	for (n = 0; n < data.notablePerformers.one.length; n++) {
		for (o = 0; o < primaryMonth.affiliateReport.length; o++) {
			if (
				data.notablePerformers.one[n] ===
				primaryMonth.affiliateReport[o].Affiliate_Id
			) {
				buildRow(oneTable, i, [
					primaryMonth.affiliateReport[o].Affiliate,
					primaryMonth.affiliateReport[o].Sales,
					primaryMonth.affiliateReport[o].Number_of_Sales,
					primaryMonth.affiliateReport[o].Conversion_Rate,
				]);
			}
		}
	}
	updateTableCell("newPartnerReport", 2, 2, twoTable);
	let threeTable = document.createElement("table");
	let z = data.notablePerformers.threeData;
	const threeTopRow = document.createElement("thead");
	threeTable.appendChild(threeTopRow);
	threeTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Affiliate"));
	threeTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Sales"));
	threeTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Number Of Sales"));
	threeTopRow
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Conversion Rate"));
	for (p = 0; p < data.notablePerformers.one.length; p++) {
		for (q = 0; q < primaryMonth.affiliateReport.length; q++) {
			if (
				data.notablePerformers.one[p] ===
				primaryMonth.affiliateReport[q].Affiliate_Id
			) {
				buildRow(oneTable, i, [
					primaryMonth.affiliateReport[q].Affiliate,
					primaryMonth.affiliateReport[q].Sales,
					primaryMonth.affiliateReport[q].Number_of_Sales,
					primaryMonth.affiliateReport[q].Conversion_Rate,
				]);
			}
		}
	}
	updateTableCell("newPartnerReport", 1, 3, threeTable);
}

function buildNewPerformersTable(y1, y2, y3) {
	let table = document.getElementById("newPartnerReport");
	let tHead = document.getElementById("newPartnerPerformanceTitle");
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Month"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("New Partners"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Performance This Month"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Notable Performers"));
	let notablePerformersTable = document.getElementById("notablePerformers");
	table.style.textAlign = "right";
	let NotablePerformers = [];
	let month1Total = 0;
	let month2Total = 0;
	let month3Total = 0;
	let nextRow = 1;
	var newObject = {};

	for (i = 0; i < report.newAffsMonth1.length; i++) {
		for (j = 0; j < primaryMonth.affiliateReport.length; j++) {
			if (
				report.newAffsMonth1[i] ===
				primaryMonth.affiliateReport[j].Affiliate_Id
			) {
				let arr1 = [
					primaryMonth.affiliateReport[j].Affiliate,
					primaryMonth.affiliateReport[j].Sales,
					primaryMonth.affiliateReport[j].Number_of_Sales,
					primaryMonth.affiliateReport[j].Conversion_Rate,
				];
				month1Total =
					month1Total + primaryMonth.affiliateReport[j].Sales;
				NotablePerformers.push(arr1);
				newObject[primaryMonth.affiliateReport[j].Affiliate_ID] = [];
				console.log(newObject);
				buildRow(notablePerformersTable, nextRow, [
					data.month,
					primaryMonth.affiliateReport[j].Affiliate,
					primaryMonth.affiliateReport[j].Sales,
					primaryMonth.affiliateReport[j].Number_of_Sales,
					primaryMonth.affiliateReport[j].Conversion_Rate,
					`<div class="form-check form-switch">
  <input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[j].Affiliate_Id, 1] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[j].Affiliate_Id +
						`"></div>`,
				]);
				nextRow = nextRow + 1;
			}
		}
	}
	buildRow(table, 0, [
		data.month,
		report.newAffsMonth2.length,
		"$" + month1Total,
		"N/A",
	]);
	for (k = 0; k < report.newAffsMonth2.length; k++) {
		for (l = 0; l < primaryMonth.affiliateReport.length; l++) {
			if (
				report.newAffsMonth2[k] ===
				primaryMonth.affiliateReport[l].Affiliate_Id
			) {
				let arr2 = [
					primaryMonth.affiliateReport[l].Affiliate,
					primaryMonth.affiliateReport[l].Sales,
					primaryMonth.affiliateReport[l].Number_of_Sales,
					primaryMonth.affiliateReport[l].Conversion_Rate,
				];
				month2Total =
					month2Total + primaryMonth.affiliateReport[l].Sales;
				console.log(month2Total);
				NotablePerformers.push(arr2);
				buildRow(notablePerformersTable, nextRow, [
					data.previousMonth,
					primaryMonth.affiliateReport[l].Affiliate,
					primaryMonth.affiliateReport[l].Sales,
					primaryMonth.affiliateReport[l].Number_of_Sales,
					primaryMonth.affiliateReport[l].Conversion_Rate,
					`<div class="form-check form-switch">
  <input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[l].Affiliate_Id, 2] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[l].Affiliate_Id +
						`"></div>`,
				]);
				nextRow = nextRow + 1;
			}
		}
	}
	buildRow(table, 1, [
		data.previousMonth,
		report.newAffsMonth3.length,
		"$" + month2Total,
		"N/A",
	]);
	for (m = 0; m < report.newAffsMonth3.length; m++) {
		for (n = 0; n < primaryMonth.affiliateReport.length; n++) {
			if (
				report.newAffsMonth3[m] ===
				primaryMonth.affiliateReport[n].Affiliate_Id
			) {
				let arr3 = [
					primaryMonth.affiliateReport[n].Affiliate,
					primaryMonth.affiliateReport[n].Sales,
					primaryMonth.affiliateReport[n].Number_of_Sales,
					primaryMonth.affiliateReport[n].Conversion_Rate,
				];
				month3Total =
					month3Total + primaryMonth.affiliateReport[n].Sales;
				NotablePerformers.push(arr3);
				buildRow(notablePerformersTable, nextRow, [
					data.twoMonthsAgo,
					primaryMonth.affiliateReport[n].Affiliate,
					primaryMonth.affiliateReport[n].Sales,
					primaryMonth.affiliateReport[n].Number_of_Sales,
					primaryMonth.affiliateReport[n].Conversion_Rate,
					`<div class="form-check form-switch">
  <input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[n].Affiliate_Id, 3] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[n].Affiliate_Id +
						`"></div>`,
				]);
				nextRow = nextRow + 1;
			}
		}
	}
	buildRow(table, 2, [
		data.twoMonthsAgo,
		report.newAffsMonth3.length,
		"$" + month3Total,
		"N/A",
	]);
	removeDisabledButton("addNotablesBtn");
}
