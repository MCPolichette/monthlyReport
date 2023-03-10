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
				(xmlDoc = new window.DOMParser().parseFromString(str, "text/xml"))
		)
		.then((data) =>
			// console.log(data)
			reportStep2(data, report_id, month)
		);
}
function reportStep2(xml, report_id, month) {
	console.log("2ndreport", report_id);
	switch (report_id) {
		case 1: //Performance Summary
			console.log(xml);
			let performanceReport = {};
			merchant.name =
				xmlDoc.getElementsByTagName("Merchant")[0].childNodes[0].nodeValue;
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
				xmlDoc.getElementsByTagName("Mobile_Sales")[0].childNodes[0].nodeValue;
			performanceReport.Number_of_Mobile_Sales = xmlDoc.getElementsByTagName(
				"Number_of_Mobile_Sales"
			)[0].childNodes[0].nodeValue;

			performanceReport.Commissions =
				xmlDoc.getElementsByTagName("Commissions")[0].childNodes[0].nodeValue;
			performanceReport.Incentives =
				xmlDoc.getElementsByTagName("Incentives")[0].childNodes[0].nodeValue;
			performanceReport.Network_Commissions = xmlDoc.getElementsByTagName(
				"Network_Commissions"
			)[0].childNodes[0].nodeValue;
			performanceReport.Number_of_Adjustments = xmlDoc.getElementsByTagName(
				"Number_of_Adjustments"
			)[0].childNodes[0].nodeValue;
			performanceReport.New_Customers =
				xmlDoc.getElementsByTagName("New_Customers")[0].childNodes[0].nodeValue;
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
					merchant.name + " " + merchant.month + " " + report.year + " Report";
				updateHeaders();
				buildFirstTable();

				viewReportButton.disabled = false;
			}
			break;
		case 15: //Performance Summary by Affiliate for selected dates
			//Performance Summary by Affiliate for selected dates
			let affiliates = [];
			let totalValues = {
				test: 0,
				clicks: 0,
				Number_of_Sales: 0,
				Number_of_Mobile_Sales: 0,
				Sales: 0,
				Ad_Impressions: 0,
				New_Customers: 0,
				New_Customer_Sales: 0,
				Mobile_Sales: 0,
				Number_of_Mobile_Sales: 0,
			};
			xmlDoc = xml.getElementsByTagName("Table1");
			console.log(xmlDoc.length);
			for (let i = 0; i < xmlDoc.length; i++) {
				affiliates.push({
					Affiliate:
						xmlDoc[i].getElementsByTagName("Affiliate")[0].childNodes[0]
							.nodeValue,
					Click_Throughs:
						xmlDoc[i].getElementsByTagName("Click_Throughs")[0].childNodes[0]
							.nodeValue,
					Affiliate_Id:
						xmlDoc[i].getElementsByTagName("Affiliate_Id")[0].childNodes[0]
							.nodeValue,
					Number_of_Sales:
						xmlDoc[i].getElementsByTagName("Number_of_Sales")[0].childNodes[0]
							.nodeValue,
					Sales:
						xmlDoc[i].getElementsByTagName("Sales")[0].childNodes[0].nodeValue,
					Ad_Impressions:
						xmlDoc[i].getElementsByTagName("Ad_Impressions")[0].childNodes[0]
							.nodeValue,

					Conversion_Rate:
						xmlDoc[i].getElementsByTagName("Conversion_Rate")[0].childNodes[0]
							.nodeValue,
					New_Customers:
						xmlDoc[i].getElementsByTagName("New_Customers")[0].childNodes[0]
							.nodeValue,
					New_Customer_Sales:
						xmlDoc[i].getElementsByTagName("New_Customer_Sales")[0]
							.childNodes[0].nodeValue,
					Mobile_Sales:
						xmlDoc[i].getElementsByTagName("Mobile_Sales")[0].childNodes[0]
							.nodeValue,
					Number_of_Mobile_Sales: xmlDoc[i].getElementsByTagName(
						"Number_of_Mobile_Sales"
					)[0].childNodes[0].nodeValue,
				});
			}
			for (let i = 0; i < affiliates.length; i++) {
				totalValues.test++;
				affiliates[i].clicks = Number(
					affiliates[i].Click_Throughs.replaceAll(",", "")
				);
				affiliates[i].sales = Number(
					affiliates[i].Sales.replaceAll(",", "").replaceAll("$", "")
				);
				affiliates[i].Number_of_Sales = Number(
					affiliates[i].Number_of_Sales.replaceAll(",", "")
				);
				affiliates[i].Ad_Impressions = Number(
					affiliates[i].Ad_Impressions.replaceAll(",", "")
				);
				affiliates[i].New_Customers = Number(
					affiliates[i].New_Customers.replaceAll(",", "")
				);
				affiliates[i].Number_of_Mobile_Sales = Number(
					affiliates[i].Number_of_Mobile_Sales.replaceAll(",", "")
				);
				affiliates[i].New_Customer_Sales = Number(
					affiliates[i].New_Customer_Sales.replaceAll(",", "").replaceAll(
						"$",
						""
					)
				);
				affiliates[i].Mobile_Sales = Number(
					affiliates[i].Mobile_Sales.replaceAll(",", "").replaceAll("$", "")
				);
			}
			affiliates.sort((a, b) => b.sales - a.sales);
			// outage.conversion_rate = Number((outage.total_sales_count / outage.total_clicks)); //.toFixed(6) !?
			console.log(merchant);
			console.log(affiliates);
			console.log(totalValues);
			break;
	}
}
