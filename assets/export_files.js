// function generatePDF() {
// 	console.log("Make a PDF");
// 	// Choose the element id which you want to export.
// 	var element = document.getElementById("report_pdf");
// 	element.style.cssText += "";
// 	// element.style.width = '1200px';
// 	// element.style.height = '800px';
// 	var opt = {
// 		margin: 0.25,
// 		filename:
// 			"Monthly Report - " +
// 			merchant.name +
// 			" - " +
// 			merchant.id +
// 			"_" +
// 			report.abMonth +
// 			report.year,
// 		image: { type: "jpeg", quality: 1 },
// 		html2canvas: { scale: 4 },
// 		jsPDF: {
// 			unit: "in",
// 			format: "letter",
// 			orientation: "landscape",
// 			precision: "12",
// 		},
// 	};
// 	// choose the element and pass it to html2pdf() function and call the save() on it to save as pdf.
// 	html2pdf().set(opt).from(element).save();
// }

function generatePDF() {
	var frame = document.getElementById("report_pdf");
	var data = frame.innerHTML;
	var win = window.open("", "", "height=500,width=1200");
	win.document.write(
		"<style>@page{size:landscape;}</style><html><head><title></title>"
	);
	win.document.write("</head><body >");
	win.document.write(data);
	win.document.write("</body></html>");
	setTimeout(function () {
		mywindow.print();
	}, 1000);

	// win.close();
	return true;
}
