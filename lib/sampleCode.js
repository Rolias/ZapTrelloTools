function onEdit(event) {
    'use strict'
    const activeWorkbook = SpreadsheetApp.getActiveSpreadsheet(),
        activeSheet = event.source.getActiveSheet(),
        activeRange = event.source.getActiveRange(),
        sourceRow = activeRange.getRow(),
        sourceValue = activeRange.getValue(),
        FROM_SHEET = "Sheet1",
        TO_SHEET = "Sheet2",
        TARGET_COL = 1,
        NUM_ROWS_TO_MOVE = 1,
        START_COL_TO_MOVE = 1,
        DESTINATION_COL = 1,
        TARGET_VALUE = "completed";

    function rowShouldBeMoved() {
        if (activeSheet.getName() !== FROM_SHEET) {
            return false;
        }
        if (activeRange.getColumn() !== TARGET_COL) {
            return false;
        }
        if (sourceValue.trim().toLowerCase() !== TARGET_VALUE) {
            return false;
        }
        return true;
    }

    function moveRowToTargetSheet() {
        const numColumns = activeSheet.getLastColumn(),
            targetSheet = activeWorkbook.getSheetByName(TO_SHEET);
        //destination can be a single cell - assumes you want row appended after last existing row
        var target = targetSheet.getRange(targetSheet.getLastRow() + 1, DESTINATION_COL);
        //source is all the columns for the row
        activeSheet.getRange(sourceRow, START_COL_TO_MOVE, NUM_ROWS_TO_MOVE, numColumns).moveTo(target);

    }

    if (rowShouldBeMoved) {
        moveRowToTargetSheet();
        activeSheet.deleteRow(sourceRow);
    }

}