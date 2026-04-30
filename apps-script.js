var SPREADSHEET_ID = '1yJg7qO27TCDYy1iJlhsQnir_o4YGEXXjLAP4qWgMQtk';
var SHEET_NAME = 'Análisis Inicial';

function doGet(e) {
  try {
    var p = e.parameter;
    if (p && p.nombre) {
      var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Fecha','Nombre','Email','Teléfono','Área','Sueño hrs','Sueño calidad','Alimentación','Ejercicio','Síntoma','Energía','Tiempo']);
      }
      var fecha = Utilities.formatDate(new Date(), 'America/Mexico_City', 'dd/MM/yyyy HH:mm:ss');
      sheet.appendRow([fecha, p.nombre, p.email, p.telefono, p.area, p.sueno_horas, p.sueno_calidad, p.alimentacion, p.ejercicio, p.sintoma, p.energia, p.tiempo]);
      return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({status:'activo v2'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error', msg: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
