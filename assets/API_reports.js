function runAPI(report) {
	startDate = report.startDate;
	endDate = report.endDate;
	report_id = report.report_id;
	month = report.month;
	console.log("running API module " + report_id);
	fetch(
		"https://classic.avantlink.com/api.php?module=AdminReport&auth_key=" +
			API_KEY +
			"&merchant_id=" +
			merchant.id +
			"&merchant_parent_id=0&affiliate_id=0&website_id=0&date_begin=" +
			startDate +
			"&date_end=" +
			endDate +
			"&affiliate_group_id=0&report_id=" +
			report_id +
			"&output=xml"
	)
		.then((response) => response.text())
		.then(
			(str) =>
				(xmlDoc = new window.DOMParser().parseFromString(
					str,
					"text/xml"
				))
		)
		.then((data) =>
			// console.log(data)
			reportStep2(data, report_id, month)
		);
}
function reportStep2(xml, report_id, month) {
	console.log("2ndreport", report_id);
	switch (report_id) {
		case 18:
			console.log(xmlDoc.getElementsByTagName("Product_SKU").length);
			for (
				let i = 0;
				i < 10;
				i++ //!? MAKE THE ITEM COUNT DYNAMIC!?
			) {
				let x = {};
				x.Product_SKU =
					xmlDoc.getElementsByTagName("Product_SKU")[i].textContent;
				console.log(x);
				x.Product_Name =
					xmlDoc.getElementsByTagName("Product_Name")[i].textContent;
				x.Sale_Count =
					xmlDoc.getElementsByTagName("Sale_Count")[i].textContent;
				x.Mobile_Sale_Count =
					xmlDoc.getElementsByTagName("Mobile_Sale_Count")[
						i
					].textContent;
				x.Total_Product_Sale_Amount = xmlDoc.getElementsByTagName(
					"Total_Product_Sale_Amount"
				)[i].textContent;
				report.productList[i] = x;
			}
			document.getElementById("product_report_btn").disabled = true;
			document.getElementById("first_loading_bar").hidden = true;
			build_products_sold_table();
			break;
		case 1: //Performance Summary
			console.log(xml);
			let performanceReport = {};
			merchant.name =
				xmlDoc.getElementsByTagName(
					"Merchant"
				)[0].childNodes[0].nodeValue;
			performanceReport.Ad_Impressions =
				xmlDoc.getElementsByTagName(
					"Ad_Impressions"
				)[0].childNodes[0].nodeValue;
			performanceReport.Click_Throughs =
				xmlDoc.getElementsByTagName(
					"Click_Throughs"
				)[0].childNodes[0].nodeValue;
			performanceReport.Sales =
				xmlDoc.getElementsByTagName("Sales")[0].childNodes[0].nodeValue;
			performanceReport.Number_of_Sales =
				xmlDoc.getElementsByTagName(
					"Number_of_Sales"
				)[0].childNodes[0].nodeValue;
			performanceReport.Mobile_Sales =
				xmlDoc.getElementsByTagName(
					"Mobile_Sales"
				)[0].childNodes[0].nodeValue;
			performanceReport.Number_of_Mobile_Sales =
				xmlDoc.getElementsByTagName(
					"Number_of_Mobile_Sales"
				)[0].childNodes[0].nodeValue;
			performanceReport.Commissions =
				xmlDoc.getElementsByTagName(
					"Commissions"
				)[0].childNodes[0].nodeValue;
			performanceReport.Incentives =
				xmlDoc.getElementsByTagName(
					"Incentives"
				)[0].childNodes[0].nodeValue;
			performanceReport.Network_Commissions = xmlDoc.getElementsByTagName(
				"Network_Commissions"
			)[0].childNodes[0].nodeValue;
			performanceReport.Number_of_Adjustments =
				xmlDoc.getElementsByTagName(
					"Number_of_Adjustments"
				)[0].childNodes[0].nodeValue;
			performanceReport.New_Customers =
				xmlDoc.getElementsByTagName(
					"New_Customers"
				)[0].childNodes[0].nodeValue;
			performanceReport.New_Customer_Sales =
				xmlDoc.getElementsByTagName(
					"New_Customer_Sales"
				)[0].childNodes[0].nodeValue;
			performanceReport.Average_Sale_Amount = xmlDoc.getElementsByTagName(
				"Average_Sale_Amount"
			)[0].childNodes[0].nodeValue;
			console.log(performanceReport);
			console.log(month);
			if (month === "primary") {
				primaryMonth.performanceReport = performanceReport;
				runAPI({
					report_id: 1,
					startDate: priorMonth.startDate,
					endDate: priorMonth.endDate,
					month: "prior",
				});
			} else {
				priorMonth.performanceReport = performanceReport;
				console.log("TEST THIS ", performanceReport);
				console.log(merchant, primaryMonth, priorMonth);
				viewReportButton.innerHTML =
					merchant.name +
					" " +
					merchant.month +
					" " +
					report.year +
					" Report";
				updateHeaders();
				buildFirstTable();
				document.getElementById("first_loading_bar").hidden = true;
				viewReportButton.disabled = false;
			}
			break;
		case 15: //Performance Summary by Affiliate for selected dates
			let affiliates = [];
			xmlDoc = xml.getElementsByTagName("Table1");
			console.log(xmlDoc.length);
			console.log;
			for (let i = 0; i < xmlDoc.length; i++) {
				affiliates.push({
					Affiliate:
						xmlDoc[i].getElementsByTagName("Affiliate")[0]
							.childNodes[0].nodeValue,
					Click_Throughs: Number(
						xmlDoc[i]
							.getElementsByTagName("Click_Throughs")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Affiliate_Id:
						xmlDoc[i].getElementsByTagName("Affiliate_Id")[0]
							.childNodes[0].nodeValue,
					Number_of_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Network_Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Network_Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Ad_Impressions: Number(
						xmlDoc[i]
							.getElementsByTagName("Ad_Impressions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Incentives: Number(
						xmlDoc[i]
							.getElementsByTagName("Incentives")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Conversion_Rate: Number(
						xmlDoc[i]
							.getElementsByTagName("Conversion_Rate")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("%", "")
					),
					New_Customers: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customers")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					New_Customer_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customer_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Number_of_Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
				});
				affiliates[i].Total_Commission =
					affiliates[i].Commissions +
					affiliates[i].Network_Commissions +
					affiliates[i].Incentives;
				affiliates[i].roa =
					affiliates[i].Sales / affiliates[i].Total_Commission;
				console.log(affiliates[i]);
			}
			if (month === "primary") {
				primaryMonth.affiliateReport = affiliates;
				runAPI({
					report_id: 15,
					startDate: priorMonth.startDate,
					endDate: priorMonth.endDate,
					month: "prior",
				});
			} else {
				priorMonth.affiliateReport = affiliates;
				for (let i = 0; i < primaryMonth.affiliateReport.length; i++) {
					for (
						let j = 0;
						j < priorMonth.affiliateReport.length;
						j++
					) {
						if (
							primaryMonth.affiliateReport[i].Affiliate_Id ===
							priorMonth.affiliateReport[j].Affiliate_Id
						) {
							primaryMonth.affiliateReport[i].lySales =
								priorMonth.affiliateReport[j].Sales;
							let x = (
								(primaryMonth.affiliateReport[i].Sales -
									priorMonth.affiliateReport[j].Sales) /
								primaryMonth.affiliateReport[i].Sales
							).toFixed(2);
							primaryMonth.affiliateReport[i].salesYOYpercent =
								Number(x);
							primaryMonth.affiliateReport[i].lyClick_Throughs =
								priorMonth.affiliateReport[j].Click_Throughs;
							let y = (
								(primaryMonth.affiliateReport[i]
									.Click_Throughs -
									priorMonth.affiliateReport[j]
										.Click_Throughs) /
								primaryMonth.affiliateReport[i].Click_Throughs
							).toFixed(2);
							primaryMonth.affiliateReport[
								i
							].Click_ThroughsYOYpercent = y;
							let lyROA = Number(
								priorMonth.affiliateReport[i].roa
							);
							let tyROA = Number(
								primaryMonth.affiliateReport[i].roa
							);
							let roayoy = ((tyROA - lyROA) / tyROA).toFixed(2);
							primaryMonth.affiliateReport[i].roaYOYPercent =
								roayoy;
							let totalCommissionYoy = (
								(primaryMonth.affiliateReport[i]
									.Total_Commission -
									priorMonth.affiliateReport[i]
										.Total_Commission) /
								primaryMonth.affiliateReport[i].Total_Commission
							).toFixed(2);
							primaryMonth.affiliateReport[
								i
							].totalCommissionYOYPercent = totalCommissionYoy;
							// if (primaryMonth.affiliateReport[i].lySales > 0) {
							report.yoyPerformance.push(
								primaryMonth.affiliateReport[i]
							);

							// }
						}
					}
				}
				console.log("sorting");
				primaryMonth.affiliateReport.sort((a, b) => b.Sales - a.Sales);
				report.yoyPerformance.sort(function (a, b) {
					return b.Sales - a.Sales;
				});
				console.log(primaryMonth);
				let topTen = [];
				for (let k = 0; k < 10; k++) {
					topTen.push(report.yoyPerformance[k]);
				}
				document.getElementById("first_loading_bar").hidden = true;
				document.getElementById("select_affiliates_btn").hidden = false;
				document.getElementById(
					"affiliate_report_button"
				).disabled = true;
				document.getElementById("affiliate_report_button").innerHTML =
					"COMPLETED - Affiliate Performance";
				buildAffiliateTable(primaryMonth.affiliateReport);
			}
			break;
	}
}
