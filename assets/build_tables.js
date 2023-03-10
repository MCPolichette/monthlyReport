function build2columns(table, row, col1, col2) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
}
function build4columns(table, row, col1, col2, col3, col4) {
	var row = table.insertRow(row);
	var cell1 = (row.insertCell(0).innerHTML = col1);
	var cell2 = (row.insertCell(1).innerHTML = col2);
	var cell3 = (row.insertCell(2).innerHTML = col3);
	var cell4 = (row.insertCell(3).innerHTML = col4);
}

function buildFirstTable() {}
