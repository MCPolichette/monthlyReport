// global variables
var merchant = {};
var report = {
	yoyPerformance: [],
	newAffsMonth1: [],
	newAffsMonth2: [],
	newAffsMonth3: [],
};
var today = {};
var primaryMonth = { month: "primary" };
var priorMonth = { month: "prior" };
var viewReportButton = document.getElementById("viewReport");
var affiliateReportButton = document.getElementById("affiliate_report_button");

//general functions
function toUSD(dollarInt) {
	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	dollarUSD = formatter.format(dollarInt);
	return dollarUSD;
}
function hide(arr) {
	//Reveals a hidden HTML element.
	arr.forEach((id) => {
		let element = document.getElementById(id);
		element.hidden = true;
	});
}
function unhide(arr) {
	//Reveals a hidden HTML element.
	arr.forEach((id) => {
		let element = document.getElementById(id);
		console.log(element);
		if (element.hidden) {
			element.removeAttribute("hidden");
		}
	});
}
function updateDivArray(array, text) {
	for (let i = 0; i < array.length; i++) {
		document.getElementById(array[i]).innerHTML = text;
	}
}
function addAffiliateToThisMonth() {
	let affiliateId = document.getElementById("addNewAffMonth1").value;
	addAffiliate(affiliateId, report.newAffsMonth1, "ID HERE");
	affiliateId.value = "";
}
function addAffiliateToLastMonth() {
	let affiliateId = document.getElementById("addNewAffMonth2").value;
	addAffiliate(affiliateId, report.newAffsMonth2, "ID HERE");
	affiliateId.value = "";
}
function addAffiliateToMonth() {
	let affiliateId = document.getElementById("addNewAffMonth3").value;
	addAffiliate(affiliateId, report.newAffsMonth3, "ID HERE");
	affiliateId.value = "";
}
function addAffiliate(affiliate, array, id) {
	if (array.c) array.push(affiliate);
	document.getElementById(id).innerHTML = "";
	for (i = 0; (i = array.length); i++) {
		let affiliateButton = document.createElement("button");
		(affiliateButton.innertext = affiliate),
			(onclick = removeAffiliate(affiliate, array));
		document.getElementById(id).appendChild(affiliateButton);
	}
}
function removeAffiliate(affiliate) {
	console.log(affiliate);
}
function DateToString(date) {
	let options = {
		// weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
		day: "numeric",
		month: "long", //to display the full name of the month
		year: "numeric",
	};
	var sDay = date.toLocaleDateString("en-US", options);
	return sDay;
}
function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}
function use_local_storage() {
	let x = window.localStorage.test;
	document.getElementById("password_input").value = x;
	console.log("used local storage to populate API key");
}
function password_check() {
	API_KEY = document.getElementById("password_input").value;
	switch (API_KEY.length) {
		case 32:
			window.localStorage.setItem("test", API_KEY);
			unhide(["monthlyReport"]);
			hide(["title"]);
			document.getElementById("first_display").remove();
			break;
		default:
			alert("This key is an unacceptable value");
			break;
	}
}

function perfomance_report() {
	var acceptableData = true;
	today.date = DateToString(new Date());
	today.year = new Date().getFullYear();
	today.month = new Date().getMonth();
	console.log(today);
	merchant.id = document.getElementById("merchant_ID_input").value;
	report.month = document.getElementById("selectedMonth").value;

	switch (report.month) {
		case "-01":
			merchant.month = "January";
			merchant.previousMonth = "December";
			merchant.twoMonthsAgo = "November";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-02":
			merchant.month = "February";
			merchant.previousMonth = "January";
			merchant.twoMonthsAgo = "December";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-03":
			merchant.month = "March";
			merchant.previousMonth = "February";
			merchant.twoMonthsAgo = "January";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-04":
			merchant.month = "April";
			merchant.previousMonth = "March";
			merchant.twoMonthsAgo = "February";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-05":
			merchant.month = "May";
			merchant.previousMonth = "April";
			merchant.twoMonthsAgo = "March";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-06":
			merchant.month = "June";
			merchant.previousMonth = "May";
			merchant.twoMonthsAgo = "April";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-07":
			merchant.month = "July";
			merchant.previousMonth = "June";
			merchant.twoMonthsAgo = "May";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-08":
			merchant.month = "August";
			merchant.previousMonth = "July";
			merchant.twoMonthsAgo = "June";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-09":
			merchant.month = "September";
			merchant.previousMonth = "August";
			merchant.twoMonthsAgo = "July";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-10":
			merchant.month = "October";
			merchant.previousMonth = "September";
			merchant.twoMonthsAgo = "August";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-11":
			merchant.month = "November";
			merchant.previousMonth = "October";
			merchant.twoMonthsAgo = "September";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
		case "-12":
			merchant.month = "December";
			merchant.previousMonth = "November";
			merchant.twoMonthsAgo = "October";
			updateDivArray(["newAffMonth1", "thisMonthList"], merchant.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				merchant.previousMonth
			);
			updateDivArray(
				["newAffMonth3", "twoMonthsAgo"],
				merchant.twoMonthsAgo
			);
			break;
	}
	let selectedYear = document.getElementById("selectedYear").value;
	report.year = Number(selectedYear);
	report.previousyear = report.year - 1;
	if (report.year > today.year || report.year < 2005) {
		acceptableData = false;
		alert("Incompatible year");
	}
	// report.previous_year = year - 1;
	console.log(merchant, report);
	if (report.month == "Select Month") {
		alert("No Month Selected \nPlease select a month");
		acceptableData = false;
	}
	if (merchant.id == "") {
		alert("No Merchant Data");
		acceptableData = false;
	}
	if (acceptableData === true) {
		let primaryDayCount = daysInMonth(
			report.month.replaceAll("-", ""),
			report.year
		);
		console.log(primaryDayCount);
		let priorDayCount = daysInMonth(report.month, report.previousyear);
		primaryMonth.startDate = report.year + report.month + "-01";
		primaryMonth.endDate =
			report.year + report.month + "-" + primaryDayCount;
		priorMonth.startDate = report.year + report.month + "-01";
		priorMonth.endDate = report.year + report.month + "-" + priorDayCount;

		console.log(primaryMonth);
		viewReportButton.hidden = false;
		document.getElementById("submitBtn").disabled = true;
		runAPI({
			report_id: 1,
			startDate: primaryMonth.startDate,
			endDate: primaryMonth.endDate,
			month: "primary",
		});
	}
}
function affiliate_report() {
	affiliateReportButton.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="visually-hidden"></span></div>`;
	runAPI({
		report_id: 15,
		startDate: primaryMonth.startDate,
		endDate: primaryMonth.endDate,
		month: "primary",
	});
	// document.getElementById("newAffMonth1text").disabled = false;
	// document.getElementById("newAffMonth2text").disabled = false;
	// document.getElementById("newAffMonth3text").disabled = false;
}
function products_sold_report() {}
