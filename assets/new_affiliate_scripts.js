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
