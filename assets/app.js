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
	topAffiliateCount: 10,
	itemCount: 10,
	monthArray: [],
};

var data = {
	monthlyPerformanceSummary: [],
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

//General Functions
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
			unhide(["monthlyReport", "report_display"]);
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
			data.month = "January";
			data.abMonth = "Jan";
			data.priorAbMonth = "Dec";
			data.priorAbMonthNum = "-12";
			data.previousMonth = "December";
			data.twoMonthsAgo = "November";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-02":
			data.month = "February";
			data.abMonth = "Feb";
			data.priorAbMonth = "Jan";
			data.priorAbMonthNum = "-01";
			data.previousMonth = "January";
			data.twoMonthsAgo = "December";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-03":
			data.month = "March";
			data.abMonth = "Mar";
			data.priorAbMonth = "Feb";
			data.priorAbMonthNum = "-02";
			data.previousMonth = "February";
			data.twoMonthsAgo = "January";
			// updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			// updateDivArray(
			// 	["newAffMonth2", "lastMonthList"],
			// 	data.previousMonth
			// );
			// updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-04":
			data.month = "April";
			data.abMonth = "Apr";
			data.priorAbMonth = "Mar";
			data.priorAbMonthNum = "-03";
			data.previousMonth = "March";
			data.twoMonthsAgo = "February";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-05":
			data.month = "May";
			data.abMonth = "May";
			data.priorAbMonth = "Apr";
			data.priorAbMonthNum = "-04";
			data.previousMonth = "April";
			data.twoMonthsAgo = "March";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-06":
			data.month = "June";
			data.abMonth = "Jun";
			data.priorAbMonth = "May";
			data.priorAbMonthNum = "-05";
			data.previousMonth = "May";
			data.twoMonthsAgo = "April";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-07":
			data.month = "July";
			data.abMonth = "Jul";
			data.priorAbMonth = "Jun";
			data.priorAbMonthNum = "-06";
			data.previousMonth = "June";
			data.twoMonthsAgo = "May";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-08":
			data.month = "August";
			data.abMonth = "Aug";
			data.priorAbMonth = "Jul";
			data.priorAbMonthNum = "-07";
			data.previousMonth = "July";
			data.twoMonthsAgo = "June";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-09":
			data.month = "September";
			data.abMonth = "Sep";
			data.priorAbMonth = "Aug";
			data.priorAbMonthNum = "-08";
			data.previousMonth = "August";
			data.twoMonthsAgo = "July";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-10":
			data.month = "October";
			data.abMonth = "Oct";
			data.priorAbMonth = "Sep";
			data.priorAbMonthNum = "-09";
			data.previousMonth = "September";
			data.twoMonthsAgo = "August";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-11":
			data.month = "November";
			data.abMonth = "Nov";
			data.priorAbMonth = "Oct";
			data.previousMonth = "October";
			data.priorAbMonthNum = "-10";
			data.twoMonthsAgo = "September";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
			break;
		case "-12":
			data.month = "December";
			data.abMonth = "Dec";
			data.priorAbMonth = "Nov";
			data.previousMonth = "November";
			data.priorAbMonthNum = "-11";
			data.twoMonthsAgo = "October";
			updateDivArray(["newAffMonth1", "thisMonthList"], data.month);
			updateDivArray(
				["newAffMonth2", "lastMonthList"],
				data.previousMonth
			);
			updateDivArray(["newAffMonth3", "twoMonthsAgo"], data.twoMonthsAgo);
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
		let priorYearDayCount = daysInMonth(
			report.month.replaceAll("-", ""),
			report.previousyear
		);
		let priorMonthDayCount = daysInMonth(
			data.priorAbMonthNum.replaceAll("-", ""),
			report.previousyear
		);
		primaryMonth.startDate = report.year + report.month + "-01";
		primaryMonth.endDate =
			report.year + report.month + "-" + primaryDayCount;
		priorMonth.startDate = report.previousyear + report.month + "-01";
		priorMonth.endDate =
			report.previousyear + report.month + "-" + priorYearDayCount;
		console.log(primaryMonth);
		console.log(priorMonth);
		// viewReportButton.hidden = false;
		runAPI({
			report_id: 48,
			startDate: priorMonth.startDate,
			endDate: primaryMonth.endDate,
			month: "primary",
		});
	}
}
//THESE TWO SCRIPTS REQUIRE NO EDITS:
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
