/**
 * GOOGLE APPS SCRIPT — Evolucione Análisis Inicial
 * ─────────────────────────────────────────────────
 * INSTRUCCIONES DE CONFIGURACIÓN:
 *
 * 1. Abre Google Sheets → Extensiones → Apps Script
 * 2. Borra el código que aparece y pega TODO este archivo
 * 3. Guarda el proyecto (Ctrl+S)
 * 4. Haz clic en "Implementar" → "Nueva implementación"
 * 5. Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 * 6. Haz clic en "Implementar" y autoriza los permisos
 * 7. Copia la URL que aparece (termina en /exec)
 * 8. Pégala en index.html donde dice REEMPLAZAR_CON_URL_APPS_SCRIPT
 * ─────────────────────────────────────────────────
 */

var SPREADSHEET_ID = '1yJg7qO27TCDYy1iJlhsQnir_o4YGEXXjLAP4qWgMQtk';
var SHEET_NAME     = 'Análisis Inicial';

// ── Función auxiliar: obtiene o crea la hoja con encabezados ──
function getSheet() {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
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
    sheet.getRange(1, 1, 1, 12)
      .setFontWeight('bold')
      .setBackground('#1a1a2e')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ── Función auxiliar: guarda una fila de datos ──
function saveRow(data) {
  var sheet = getSheet();
  var now   = new Date();
  var fecha = Utilities.formatDate(now, 'America/Mexico_City', 'dd/MM/yyyy HH:mm:ss');
  sheet.appendRow([
    fecha,
    data.nombre        || '',
    data.email         || '',
    data.telefono      || '',
    data.area          || '',
    data.sueno_horas   || '',
    data.sueno_calidad || '',
    data.alimentacion  || '',
    data.ejercicio     || '',
    data.sintoma       || '',
    data.energia       || '',
    data.tiempo        || ''
  ]);
  sheet.autoResizeColumns(1, 12);
}

// ── doGet — recibe los datos como parámetros en la URL ──
// Es el método principal (compatible con fetch no-cors desde sitios estáticos)
function doGet(e) {
  try {
    var p = e.parameter;

    // Si vienen parámetros de un lead, guardar
    if (p && p.nombre) {
      saveRow(p);
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Sin parámetros → endpoint de salud
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'activo', mensaje: 'Evolucione Apps Script funcionando.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error doGet: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── doPost — fallback por si se usa POST ──
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    saveRow(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
