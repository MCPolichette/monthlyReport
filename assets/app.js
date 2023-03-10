// global variables
var merchant = {};
var report = {};
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
			break;
		case "-02":
			merchant.month = "February";
			break;
		case "-03":
			merchant.month = "March";
			break;
		case "-04":
			merchant.month = "April";
			break;
		case "-05":
			merchant.month = "May";
			break;
		case "-06":
			merchant.month = "June";
			break;
		case "-07":
			merchant.month = "July";
			break;
		case "-08":
			merchant.month = "August";
			break;
		case "-09":
			merchant.month = "September";
			break;
		case "-10":
			merchant.month = "October";
			break;
		case "-11":
			merchant.month = "November";
			break;
		case "-12":
			merchant.month = "December";
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
		primaryMonth.endDate = report.year + report.month + "-" + primaryDayCount;
		priorMonth.startDate = report.year + report.month + "-01";
		priorMonth.endDate = report.year + report.month + "-" + priorDayCount;

		console.log(primaryMonth);
		viewReportButton.hidden = false;
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
}