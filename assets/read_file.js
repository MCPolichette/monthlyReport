function read_file(input) {
	let fileName = fileCheck(input).replace(/ *\([^)]*\) */g, "");
	let id = input.id;
	let file = input.files[0];
	let fileReader = new FileReader();
	let allLines = [];
	fileReader.readAsText(file);
	fileReader.onload = function () {
		var text = fileReader.result;
		var allLines = text.split("\n");
		var topRow = allLines[0].split(",");
		let valuesRegExp = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g;
		let elements = [];
		console.log("TOP ROW of REPORT- ", topRow);
		if (topRow[1] == "First Name") {
			//THIS IS AN AFFILIATE REPORT FOR Commission RATE
			if (primaryMonth.affiliateReport == []) {
				alert(
					"YOU MUST RUN THE PERFORMANCE SUMMARY BY AFFILIATE FIRST"
				);
			} else {
				secondButtonBoolean = true;
				console.log("File Read!? " + secondButtonBoolean);
				console.log(allLines.length);
				console.log(allLines[0], allLines[1]);
				console.log(data);
				for (i = 1; i < allLines.length - 1; i++) {
					let thisRow = allLines[i].split(",");
					if (thisRow[10]) {
						let approvalDate = thisRow[10].toString().split("/");
						if (approvalDate[2].length === 2) {
							approvalDate[2] = 20 + approvalDate[2];
						}
						const month = Number(approvalDate[0]);
						const year = Number(approvalDate[2]);

						switch (true) {
							case month === data.thisMonthArray[0] &&
								year === data.thisMonthArray[1]:
								console.log(month, year);
								report.newAffsMonth1.push(thisRow[0]);
								break;
							case month === data.oneMonthAgoArray[0] &&
								year === data.oneMonthAgoArray[1]:
								report.newAffsMonth2.push(thisRow[0]);
								break;
							case month === data.twoMonthsAgoArray[0] &&
								year === data.twoMonthsAgoArray[1]:
								report.newAffsMonth3.push(thisRow[0]);
								break;
							default:
								// no conditions match.
								break;
						}
						// if (
						// 	Number(approvalDate[0]) == data.thisMonthArray[0] &&
						// 	Number(approvalDate[2]) == data.thisMonthArray[1]
						// ) {
						// 	report.newAffsMonth1.push(thisRow[0]);
						// }
						// if (
						// 	Number(approvalDate[0]) ==
						// 		data.oneMonthAgoArray[0] &&
						// 	Number(approvalDate[2]) == data.oneMonthAgoArray[1]
						// ) {
						// 	report.newAffsMonth2.push(thisRow[0]);
						// }
						// if (
						// 	Number(approvalDate[0]) ==
						// 		data.twoMonthsAgoArray[0] &&
						// 	Number(approvalDate[2]) == data.twoMonthsAgoArray[1]
						// ) {
						// 	report.newAffsMonth3.push(thisRow[0]);
						// }
					}
				}
			}
			buildNewPerformersTable();
		}
	};
}

function fileCheck(myFile) {
	var file = myFile.files[0];
	var filename = file.name;
	filename.split("-");
	console.log("FILENAME, ", filename);
	return filename;
}
