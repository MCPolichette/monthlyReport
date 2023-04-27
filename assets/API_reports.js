function runAPI(report) {
	startDate = report.startDate;
	endDate = report.endDate;
	report_id = report.report_id;
	month = report.month;
	console.log("API DETAILS", report);
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
		case 65:
			let affArray = [];
			let growthArr = [];
			let declineArr = [];
			xmlDoc = xml.getElementsByTagName("Table1");
			console.log(xmlDoc);
			console.log;
			for (let i = 0; i < xmlDoc.length; i++) {
				affArray.push({
					Affiliate:
						xmlDoc[i].getElementsByTagName("Affiliate_Name")[0]
							.childNodes[0].nodeValue,
					Sales_Current: Number(
						xmlDoc[i]
							.getElementsByTagName("Sales_Current")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Sales_Previous: Number(
						xmlDoc[i]
							.getElementsByTagName("Sales_Previous")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Percent_Change_in_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Percent_Change_in_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("%", "")
					),
				});
			}
			for (j = 0; j < affArray.length; j++) {
				if (
					affArray[j].Sales_Previous > 0 &&
					affArray[j].Sales_Current > 0
				) {
					growthArr.push(affArray[j]);
					declineArr.push(affArray[j]);
				}
			}
			console.log(affArray);
			growthArr.sort(
				(a, b) =>
					parseFloat(b.Percent_Change_in_Sales) -
					parseFloat(a.Percent_Change_in_Sales)
			);
			declineArr.sort(
				(a, b) =>
					parseFloat(a.Percent_Change_in_Sales) -
					parseFloat(b.Percent_Change_in_Sales)
			);
			buildGrowthAndDeclineTables(declineArr, growthArr);

			break;
		case 48:
			console.log(xmlDoc);
			for (i = 0; i < 13; i++) {
				let m = {};
				m.Month =
					xmlDoc.getElementsByTagName("Month")[
						i
					].childNodes[0].nodeValue;
				m.Ad_Impressions = Number(
					xmlDoc
						.getElementsByTagName("Ad_Impressions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Click_Throughs = Number(
					xmlDoc
						.getElementsByTagName("Click_Throughs")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Sales = Number(
					xmlDoc
						.getElementsByTagName("Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Sales = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Mobile_Sales = Number(
					xmlDoc
						.getElementsByTagName("Mobile_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Mobile_Sales = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Mobile_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Commissions = Number(
					xmlDoc
						.getElementsByTagName("Commissions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Incentives = Number(
					xmlDoc
						.getElementsByTagName("Incentives")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Network_Commissions = Number(
					xmlDoc
						.getElementsByTagName("Network_Commissions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Adjustments = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Adjustments")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Conversion_Rate = Number(
					xmlDoc
						.getElementsByTagName("Conversion_Rate")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("%", "")
				);
				m.New_Customers = Number(
					xmlDoc
						.getElementsByTagName("New_Customers")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.New_Customer_Sales = Number(
					xmlDoc
						.getElementsByTagName("New_Customer_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Average_Sale_Amount = Number(
					xmlDoc
						.getElementsByTagName("Average_Sale_Amount")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Click_Through_Rate = Number(
					xmlDoc
						.getElementsByTagName("Click_Through_Rate")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				data.monthlyPerformanceSummary.push(m);
			}
			console.log(data);
			runAPI({
				report_id: 1,
				startDate: primaryMonth.startDate,
				endDate: primaryMonth.endDate,
				month: "primary",
			});
			buildQuickStatsTable();
			buildYoyTable();
			buildMomTable();
			report.monthArray = data.monthlyPerformanceSummary;
			drawChart1();
			break;
		case 18:
			console.log(xmlDoc.getElementsByTagName("Product_SKU").length);
			for (let i = 0; i < report.itemCount; i++) {
				let x = {};
				x.Product_SKU =
					xmlDoc.getElementsByTagName("Product_SKU")[i].textContent;
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
			removeDisabledButton("select_affiliates_btn");
			completeButton(
				"product_report_btn",
				"COMPLETED - Products Sold API"
			);
			build_products_sold_table();
			break;
		case 1: //Performance Summary
			console.log(xml);
			merchant.name =
				xmlDoc.getElementsByTagName(
					"Merchant"
				)[0].childNodes[0].nodeValue;

			// viewReportButton.innerHTML =
			// 	merchant.name +
			// 	" " +
			// 	merchant.month +
			// 	" " +
			// 	report.year +
			// 	" Report";
			updateHeaders();
			completeButton("submitBtn", "Merchant & Date Selected");
			removeDisabledButton("affiliate_report_button");
			// removeDisabledButton("viewReport");
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
							let lyROA;
							if (priorMonth.affiliateReport[j].roa) {
								lyROA = Number(
									priorMonth.affiliateReport[j].roa
								);
							} else {
								lyROA = 0;
							}
							let tyROA = Number(
								primaryMonth.affiliateReport[i].roa
							);
							let roayoy = (tyROA - lyROA) / tyROA;
							primaryMonth.affiliateReport[i].roaYOYPercent =
								roayoy;
							let totalCommissionYoy = (
								(primaryMonth.affiliateReport[i]
									.Total_Commission -
									priorMonth.affiliateReport[j]
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
				primaryMonth.affiliateReport.sort((a, b) => b.Sales - a.Sales);
				report.yoyPerformance.sort(function (a, b) {
					return b.Sales - a.Sales;
				});
				console.log(primaryMonth);
				let topTen = [];
				for (let k = 0; k < 10; k++) {
					topTen.push(report.yoyPerformance[k]);
				}
				buildAffiliateTable(primaryMonth.affiliateReport);
				runAPI({
					report_id: 65,
					startDate: primaryMonth.startDate,
					endDate: primaryMonth.endDate,
					month: "primary",
				});
			}
			break;
	}
}
