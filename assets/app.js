// global variables
var merchant = {};
var report = {
	yoyPerformance: [],
	newAffsMonth1: [],
	newAffsMonth2: [],
	newAffsMonth3: [],
	productList: [],
	GrowingPerformancebyYoyPercent: [],
	DecliningPerformancebyYoyPercent: [],
};
// NOTES:
// PRIMARY MONTH = month we're reporting on
// Prior Month = (primaryMonth - 1)
// Prior Year = (primaryMonth - 12)
var performanceData = {
	primaryMonth: {},
	priorMonth: {},
	priorYear: {},
};
var icons = {
	up: `<i class="fa fa-caret-square-o-up" style="color:green"></i>`,
	down: `<i class="fa fa-caret-square-o-down" style="color:red"></i>`,
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
function removeDisabledButton(id) {
	let btn = document.getElementById(id);
	btn.disabled = false;
	btn.classList = "btn btn-success";
}
function loadButton(id) {
	document.getElementById("first_loading_bar").hidden = false;
	let btn = document.getElementById(id);
	btn.disabled = true;
	btn.classList = "btn btn-outline.primary";
	btn.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
}
function addNote() {
	let noteTitle = document.getElementById("manualTitleText").value;
	let noteContent = document.getElementById("manualNotesText").value;
	let noteSection = document.getElementById("notesDiv");
	noteContent = noteContent.replace(/\r?\n/g, "<br />");
	let note = `<h5>` + noteTitle + `</h5><p>` + noteContent + `</p>`;
	noteSection.insertAdjacentHTML("afterend", note);
	noteTitle = "";
	noteContent = "";
}
function completeButton(id, newText) {
	document.getElementById("first_loading_bar").hidden = true;
	let btn = document.getElementById(id);
	btn.disabled = true;
	btn.innerHTML = newText;
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

function testclick() {}

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
	loadButton("submitBtn");
	var acceptableData = true;
	today.date = DateToString(new Date());
	today.year = new Date().getFullYear();
	today.month = new Date().getMonth();
	console.log(today);
	merchant.id = document.getElementById("merchant_ID_input").value;
	report.month = document.getElementById("selectedMonth").value;
	document.getElementById("merchant_logo").src =
		"https://static.avantlink.com/merchant-logos/" + merchant.id + ".png";

	switch (report.month) {
		case "-01":
			merchant.month = "January";
			merchant.abMonth = "Jan";
			merchant.pabMonth = "Dec";
			merchant.pabMonthNum = "-12";
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
			merchant.abMonth = "Feb";
			merchant.pabMonth = "Jan";
			merchant.pabMonthNum = "-01";
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
			merchant.abMonth = "Mar";
			merchant.pabMonth = "Feb";
			merchant.pabMonthNum = "-02";
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
			merchant.abMonth = "Apr";
			merchant.pabMonth = "Mar";
			merchant.pabMonthNum = "-03";
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
			merchant.abMonth = "May";
			merchant.pabMonth = "Apr";
			merchant.pabMonthNum = "-04";
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
			merchant.abMonth = "Jun";
			merchant.pabMonth = "May";
			merchant.pabMonthNum = "-05";
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
			merchant.abMonth = "Jul";
			merchant.pabMonth = "Jun";
			merchant.pabMonthNum = "-06";
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
			merchant.abMonth = "Aug";
			merchant.pabMonth = "Jul";
			merchant.pabMonthNum = "-07";
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
			merchant.abMonth = "Sep";
			merchant.pabMonth = "Aug";
			merchant.pabMonthNum = "-08";
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
			merchant.abMonth = "Oct";
			merchant.pabMonth = "Sep";
			merchant.pabMonthNum = "-09";
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
			merchant.abMonth = "Nov";
			merchant.pabMonth = "Oct";
			merchant.previousMonth = "October";
			merchant.pabMonthNum = "-10";
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
			merchant.abMonth = "Dec";
			merchant.pabMonth = "Nov";
			merchant.previousMonth = "November";
			merchant.pabMonthNum = "-11";
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
		// // Performance OBject
		// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  COME BACK TO THIS
		// //Primary Month
		// performanceData.primaryMonth.dayCount = daysInMonth(
		// 	report.month.replaceAll("-", ""),
		// 	report.year
		// );
		// performanceData.primaryMonth.startDate =
		// 	report.year + report.month + "-01";
		// performanceData.primaryMonth.endDate =
		// 	report.year +
		// 	report.month +
		// 	"-" +
		// 	performanceData.primaryMonth.dayCount;
		// //Prior Month
		// if(report.month =="-01"){
		// 	performanceData.priorMonth.month = "-12"
		// }else performanceData.priorMonth.month =
		// performanceData.priorMonth.dayCount = daysInMonth(
		// 	report.month.replaceAll("-", ""),
		// 	report.year
		// );
		// performanceData.priorMonth.startDate =
		// 	report.year + report.month + "-01";
		// performanceData.priorMonth.endDate =
		// 	report.year +
		// 	report.month +
		// 	"-" +
		// 	performanceData.priorMonth.dayCount;
		// // Prior Year
		// performanceData.priorYear.dayCount = daysInMonth(
		// 	report.month.replaceAll("-", ""),
		// 	report.previousyear
		// );
		// performanceData.priorYear.startDate =
		// 	report.previousyear + report.month + "-01";
		// performanceData.priorYear.endDate =
		// 	report.previousyear + report.month + "-" + priorDayCount;

		// Performance Object END !!!!!! COME BACK TO THIS
		let primaryDayCount = daysInMonth(
			report.month.replaceAll("-", ""),
			report.year
		);
		console.log(primaryDayCount);
		let priorYearDayCount = daysInMonth(
			report.month.replaceAll("-", ""),
			report.previousyear
		);
		let priorMonthDayCount = daysInMonth(
			merchant.pabMonthNum.replaceAll("-", ""),
			report.previousyear
		);
		primaryMonth.startDate = report.year + report.month + "-01";
		primaryMonth.endDate =
			report.year + report.month + "-" + primaryDayCount;
		priorMonth.startDate = report.previousyear + report.month + "-01";
		priorMonth.endDate =
			report.previousyear + report.month + "-" + priorYearDayCount;
		// performanceData.oneMonthAgo.startDate =
		// 	report.year + merchant.pabMonthNum + "-01";
		// performanceData.oneMonthAgo.endDate =
		// 	report.year + merchant.pabMonthNum + "-" + priorMonthDayCount;
		console.log(primaryMonth);
		console.log(priorMonth);
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
	document.getElementById("first_loading_bar").hidden = false;
	document.getElementById(
		"affiliate_report_button"
	).innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
	runAPI({
		report_id: 15,
		startDate: primaryMonth.startDate,
		endDate: primaryMonth.endDate,
		month: "primary",
	});
}
function products_sold_report() {
	document.getElementById("first_loading_bar").hidden = false;
	runAPI({
		report_id: 18,
		startDate: primaryMonth.startDate,
		endDate: primaryMonth.endDate,
		month: "primary",
	});
}
