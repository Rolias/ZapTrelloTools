function onEdit(event) {
    'use strict'
    const activeWorkbook = SpreadsheetApp.getActiveSpreadsheet(),
        activeSheet = event.source.getActiveSheet(),
        activeRange = event.source.getActiveRange(),
        col = activeRange.getColumn(),
        val = activeRange.getValue(),
        activeSheetName = activeSheet.getName(),
        FROM_SHEET = "Sheet1",
        TO_SHEET = "Sheet2",
        TARGET_COL = 1,
        NUM_ROWS_TO_MOVE = 1,
        START_COL_TO_MOVE = 1,
        DESTINATION_COL = 1,
        TARGET_VALUE = "completed";

    //Bail out if this isn't the correct sheet, or column or value for the column
    if (activeSheet.getName() !== FROM_SHEET) {
        return false;
    }
    if (col !== TARGET_COL) {
        return false;
    }
    if (val.trim().toLowerCase() !== TARGET_VALUE) {
        return false;
    }

    //Move the row to the destination sheet and delete the original row
    const row = activeRange.getRow(),
        numColumns = activeSheet.getLastColumn(),
        targetSheet = activeWorkbook.getSheetByName(TO_SHEET);
    //destination can be a single cell - assumes you want row append after last existing row
    var target = targetSheet.getRange(targetSheet.getLastRow() + 1, DESTINATION_COL);
    //source is all the columns for the row
    activeSheet.getRange(row, START_COL_TO_MOVE, NUM_ROWS_TO_MOVE, numColumns).moveTo(target);
    activeSheet.deleteRow(row);
}