// ========================================== START doGet()
function doGet(e) {
    // ========================================== INITIALIZE
    var sheetName = e.parameter.sheet || "Sheet1";
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    // ========================================== END INITIALIZE

    // ========================================== VALUES

    // Menentukan baris terakhir dan kolom terakhir secara dinamis
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var xlastRow = countValuesByCol(1);
    var xlastCol = countValuesByRow(1);

    // Fungsi untuk mendapatkan nilai berdasarkan baris
    function getValuesByRow(row) {
        return sheet.getRange(row, 1, 1, lastCol).getValues()[0].filter(val => val !== "");
    }

    // Fungsi untuk menghitung jumlah nilai berdasarkan baris
    function countValuesByRow(row) {
        return sheet.getRange(row, 1, 1, lastCol).getValues()[0].filter(val => val !== "").length; 
    }

    // Fungsi untuk menghitung jumlah nilai berdasarkan baris
    function countValuesByRowtoString(row) {
        return sheet.getRange(row, 1, 1, lastCol).getValues()[0].filter(val => val !== "").length.toString(); 
    }

    // Fungsi untuk mendapatkan nilai berdasarkan kolom
    function getValuesByCol(col) {
        return sheet.getRange(1, col, lastRow, 1).getValues().flat().filter(val => val !== "");
    }
    

    // Fungsi untuk menghitung jumlah nilai berdasarkan kolom
    function countValuesByCol(col) {
        return sheet.getRange(1, col, lastRow, 1).getValues().flat().filter(val => val !== "").length;
    }

    // Fungsi untuk menghitung jumlah nilai berdasarkan kolom
    function countValuesByColtoString(col) {
        return sheet.getRange(1, col, lastRow, 1).getValues().flat().filter(val => val !== "").length.toString(); 
    }

    // Fungsi untuk mendapatkan semua nilai pada lembar kerja
    function getValuesSheet() {
        return sheet.getDataRange().getValues().filter(row => row[0].toString().trim() !== "");
    }

    // Menyusun hasil akhir dengan nilai sebagai string
    var dataSheet = {
        length: {
            firstRow: countValuesByRow(1),
            secondRow: countValuesByRow(2),
            lastRow: countValuesByRow(lastRow),
            firstCol: countValuesByColtoString(1),
            secondCol: countValuesByColtoString(2),
            lastCol: countValuesByColtoString(lastCol),
        },
        values: {
            firstRow: getValuesByRow(1),
            secondRow: getValuesByRow(2),
            lastRow: getValuesByRow(lastRow),
            firstCol: getValuesByCol(1),
            secondCol: getValuesByCol(2),
            lastCol: getValuesByCol(lastCol),
            sheet: getValuesSheet(),
        },
    };

    // ========================================== END VALUES

    // ========================================== RESPONSES
    // Respons untuk status HTTP
    var responses = {
        100: { response: 100, status: "success" },
        101: { response: 101, status: "success" },
        200: { response: 200, status: "success" },
        201: { response: 201, status: "success" },
        202: { response: 202, status: "success" },
        204: { response: 204, status: "success" },
        300: { response: 300, status: "success" },
        301: { response: 301, status: "success" },
        302: { response: 302, status: "success" },
        304: { response: 304, status: "success" },
        400: { response: 400, status: "error", message: "Invalid request" },
        401: { response: 401, status: "error", message: "Access denied due to missing or invalid credentials" },
        403: { response: 403, status: "error", message: "Access to the resource is forbidden" },
        404: { response: 404, status: "error", message: "Resource not found" },
        500: { response: 500, status: "error", message: "Internal server error occurred" },
        502: { response: 502, status: "error", message: "Invalid response received from upstream server" },
        503: { response: 503, status: "error", message: "Service temporarily unavailable" },
    };
    function responseMessage(response, message) { return {...response, message:message}};

    // Fungsi untuk membuat respons JSON dengan data
    function createJsonResponseWithData(response) {
        return ContentService
            .createTextOutput(JSON.stringify({...responses[200], data: response }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    // Fungsi untuk membuat respons JSON dengan pesan kesalahan
    function createJsonResponse(response) {
        return ContentService
            .createTextOutput(JSON.stringify(response))
            .setMimeType(ContentService.MimeType.JSON);
    }
    // ========================================== END RESPONSES

    // ========================================== PARAMS
    // ===========================================
    // ================ PARAMETER INIT
    function parseRowParam(param) {
        if (!isNaN(param)) {
          return { type: "number", value: parseInt(param) };
        } else if (param.toLowerCase() === 'x') {
          return { type: "row", value: "x" };
        } else {
          throw new Error("Parameter row tidak valid.");
        }
      }
    
      function parseColParam(param) {
        if (!isNaN(param)) {
          return { type: "number", value: parseInt(param) };
        } else if (param.toLowerCase() === 'x') {
          return { type: "column", value: "x" };
        } else {
          throw new Error("Parameter col tidak valid.");
        }
      }

      var rowParam = e.parameter.row;
      var colParam = e.parameter.col;
      var valuesParam = e.parameter.values;
      
    // ================  PARAMETER CHECK
    try {
        if (e && e.parameter && e.parameter.sheet) {
            if (e.parameter.action === 'get') {
                return createJsonResponseWithData(getOperation());
            } else if (e.parameter.action === 'set' || e.parameter.action === 'put') {
                return createJsonResponse(setOperation());
            } else if (e.parameter.action === 'append' || e.parameter.action === 'post') {
                return createJsonResponse(appendOperation());
            } else if (e.parameter.action === 'delete') {
                return createJsonResponse(deleteOperation());
            } else if (e.parameter.action === 'login') {
                return createJsonResponse(loginOperation());
            } else {
                return createJsonResponse(responseMessage(responses[400],"missing parameter: action"));
            }
        } else {
            return createJsonResponse(responseMessage(responses[400],"missing parameter"));
        }
    } catch (error) {
      return createJsonResponse(responseMessage(responses[500], "error trying parameters"));
    }
    // ========================================== END PARAMS

    // ========================================== GET
    function getOperation() {
        var data;
        if (rowParam) {
            if (rowParam === "x") {
                data = getValuesByRow(countValuesByCol(1));
            } else {
                data = getValuesByRow(parseInt(rowParam));
            }
            return data;
        } else if (colParam) {
            if (rowParam === "x") {
                data = getValuesByCol(lastCol);
            } else {
                data = getValuesByCol(parseInt(colParam));
            }
            return data;
        } else {
            return getValuesSheet();
        }
    }
    // ========================================== GET

    // ========================================== SET || PUT
    function setOperation() {
        if (valuesParam) {
            var values = valuesParam.split(',');
            if (rowParam) {
            values.unshift("");
                var row = parseRowParam(rowParam);
                var rowNum = (row.value === "x") ? xlastRow : row.value;
                sheet.getRange(rowNum, 1, 1, values.length).setValues([values]);
                return responseMessage(responses[200],"values is set to row");
            } else if (colParam) {
                var col = parseColParam(colParam);
                var colNum = (col.value === "x") ? xlastCol : col.value;
                values.unshift(sheet.getRange(1, colNum, 1, 1).getValues()[0][0]);
                for (var i = 0; i < values.length; i++) {
                  sheet.getRange(i + 1, colNum).setValue(values[i]);
                }
                return responseMessage(responses[200],"values is set to col");
        }else{
            return responseMessage(responses[400],"missing parameter: row or col");
        }
        } else {
            return responseMessage(responses[400],"missing parameter: values");
        }
      }
    // ========================================== END SET || PUT


    // ========================================== APPEND || POST
      function appendOperation() {
        if (valuesParam) {
            var values = valuesParam.split(',');
            if (rowParam) {
                values.unshift("");
                var row = parseRowParam(rowParam);
                var rowNum = (row.value === "x") ? xlastRow : row.value;
                sheet.insertRowAfter(rowNum);
                sheet.getRange(rowNum+1, 1, 1, values.length).setValues([values]);
                return responseMessage(responses[200],"values is append to row");
            } else if (colParam) {
                var col = parseColParam(colParam);
                var colNum = (col.value === "x") ? xlastCol : col.value;
                // values.unshift(sheet.getRange(1, colNum, 1, 1).getValues()[0][0]);
                // values.unshift("column");
                sheet.insertColumnAfter(colNum+1);
                for (var i = 0; i < values.length; i++) {
                    sheet.getRange(i + 1, colNum+2,1,1).setValue(values[i]);
                }
                return responseMessage(responses[200],"values is append to col");
            }else{
                return responseMessage(responses[400],"missing parameter: row or col")
              }
        } else {
            return responseMessage(responses[400],"missing parameter: values")
        }
      }
    // ========================================== END APPEND || POST

    // ========================================== DELETE
    function deleteOperation() {
        if (rowParam) {
            var rowValues = rowParam.split(',');
            if (rowValues.length < 2) {
                var rowNum = (rowValues[0] === "x") ? xlastRow : parseInt(rowValues[0]);
                sheet.deleteRow(rowNum);
                return responseMessage(responses[200],"row deleted");
            } else {
                for (var i = 0; i < rowValues.length; i++) {
                    sheet.deleteRow(parseInt(rowValues[i]));
                }
                return responseMessage(responses[200],"rows deleted");
            }
        } else if (colParam) {
            var colValues = colParam.split(',');
            if (colValues.length < 2) {
                var colNum = (colValues[0] === "x") ? xlastCol : parseInt(colValues[0]);
                sheet.deleteColumn(colNum);
                return responseMessage(responses[200],"column deleted");
            } else {
                for (var j = 0; j < colValues.length; j++) {
                    sheet.deleteColumn(parseInt(colValues[j]));
                }
                return responseMessage(responses[200],"columns deleted");
            }
        } else {
            return createJsonResponse(responseMessage(responses[400],"missing parameter: row or col"));
        }
    }
    
    // ========================================== END DELETE

    // ========================================== LOGIN
    function loginOperation() {
        // Mengambil semua data pada lembar kerja
        var data = sheet.getDataRange().getValues();
        var username  = e.parameter.user;
        var email     = e.parameter.email;
        var password  = e.parameter.pass;
        var cols      = e.parameter.cols.split(',');
        var userCol   = cols[0]-1;
        var passCol   = cols[1]-1;
        var emailCol   = cols[2]-1;
    
        // Looping melalui data untuk mencocokkan username dan password
        for (var i = 0; i < data.length; i++) {
            if (((data[i][userCol] === username) || (data[i][emailCol] === email)) && data[i][passCol] === password) {
                // var rowValues = sheet.getRange(i,1,1,xlastRow).getValues();
                return {...responseMessage(responses[200], "Login berhasil"),data:data[i]};
            }
        }
    
        // Jika tidak ada yang cocok, kembalikan pesan login gagal
        return responseMessage(responses[401], "Login gagal: username atau password salah");
    }
    // ========================================== END LOGIN
    
}
// ========================================== END doGet()
