/**
 * GOOGLE APPS SCRIPT — Evolucione Análisis Inicial
 * ─────────────────────────────────────────────────
 * INSTRUCCIONES DE CONFIGURACIÓN:
 *
 * 1. Abre Google Sheets y crea una hoja nueva
 * 2. Ve a Extensiones → Apps Script
 * 3. Borra el código que aparece y pega TODO este archivo
 * 4. Guarda el proyecto (Ctrl+S)
 * 5. Haz clic en "Implementar" → "Nueva implementación"
 * 6. Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 * 7. Haz clic en "Implementar" y autoriza los permisos
 * 8. Copia la URL que aparece (termina en /exec)
 * 9. Pega esa URL en index.html donde dice REEMPLAZAR_CON_URL_APPS_SCRIPT
 * ─────────────────────────────────────────────────
 */

// ID de tu Google Sheet (está en la URL: docs.google.com/spreadsheets/d/[ESTE_ID]/edit)
var SPREADSHEET_ID = 'REEMPLAZAR_CON_ID_DE_TU_SHEET';

// Nombre de la hoja donde se guardarán los datos
var SHEET_NAME = 'Análisis Inicial';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    // Si la hoja no existe, créala con encabezados
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Fecha y hora',
        'Nombre',
        'Email',
        'Teléfono',
        'Área profesional',
        'Horas de sueño',
        'Calidad del sueño',
        'Alimentación',
        'Ejercicio',
        'Síntoma principal',
        'Energía mental',
        'Tiempo con el problema'
      ]);
      // Formato de encabezados
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    // Formatear fecha legible en CDMX
    var now = new Date();
    var fechaLegible = Utilities.formatDate(now, 'America/Mexico_City', 'dd/MM/yyyy HH:mm:ss');

    // Agregar fila
    sheet.appendRow([
      fechaLegible,
      data.nombre      || '',
      data.email       || '',
      data.telefono    || '',
      data.area        || '',
      data.sueno_horas || '',
      data.sueno_calidad || '',
      data.alimentacion  || '',
      data.ejercicio     || '',
      data.sintoma       || '',
      data.energia       || '',
      data.tiempo        || ''
    ]);

    // Auto-resize columnas
    sheet.autoResizeColumns(1, 12);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint de prueba (GET) — visita la URL para verificar que el script está activo
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'activo', mensaje: 'Evolucione Apps Script funcionando correctamente.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
