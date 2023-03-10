// global variables
var merchant = {};
var report = {};
var today = {};
var primaryMonth = {};
var PriorMonth = {};

//general functions
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
		let firstMonthDayCount = daysInMonth(
			report.month.replaceAll("-", ""),
			report.year
		);
		console.log(firstMonthDayCount);
		let secondMonthDayCount = daysInMonth(report.month, report.previousyear);
		let reportedMonth = {
			startDate: report.year + report.month + "-01",
			endDate: report.year + report.month + "-" + firstMonthDayCount,
		};
		console.log(reportedMonth);

		runAPI({
			report_id: 1,
			startDate: reportedMonth.startDate,
			endDate: reportedMonth.endDate,
		});

		// runAPI({
		// 	report_id: 15,
		// 	startDate: reportedMonth.startDate,
		// 	endDate: reportedMonth.endDate,
		// })
	}
}
