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
function addAffiliateToThisMonth() {
	let affiliateId = document.getElementById("addNewAffMonth1").value;
	addAffiliate(
		affiliateId,
		report.newAffsMonth1,
		"thisMonthListOfAffiliates",
		"addNewAffMonth1"
	);
	affiliateId.value = "";
}
function addAffiliateToLastMonth() {
	let affiliateId = document.getElementById("addNewAffMonth2").value;
	addAffiliate(
		affiliateId,
		report.newAffsMonth2,
		"lastMonthListOfAffiliates",
		"addNewAffMonth2"
	);
	affiliateId.value = "";
}
function addAffiliateTwoMonths() {
	let affiliateId = document.getElementById("addNewAffMonth3").value;
	addAffiliate(
		affiliateId,
		report.newAffsMonth3,
		"twoMonthsAgoListOfAffiliates",
		"addNewAffMonth3"
	);
	affiliateId.value = "";
}
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

	switch (report.month) {
		case "-01":
			merchant.month = "January";
			merchant.abMonth = "Jan";
			merchant.pabMonth = "Dec";
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
