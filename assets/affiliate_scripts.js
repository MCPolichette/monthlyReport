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
