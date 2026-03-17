/**
 * PRINTHUB — Google Apps Script Web App
 * Middleware API REST pour les 3 Google Sheets
 * 
 * DÉPLOIEMENT :
 * 1. Aller sur https://script.google.com/home
 * 2. Nouveau projet → coller ce code
 * 3. Déployer → Nouveau déploiement → Application Web
 * 4. Accès : "Tout le monde"
 * 5. Copier l'URL de déploiement dans sheets.js du portail
 */

// ── IDs des Sheets ──────────────────────────────────────────────
const SHEETS = {
  clients:   '1_cjK390kcpvp07K7nwOgrpYcJi44cYO1BoiwOxZB-8w',
  commandes: '1GBWvYA0Z2r959es1uKhX7r1rMfIfE5GLZAIcp5GiqKY',
  devis:     '1srywH9Eh8ClmeramN-gVwgD5DPnqSjcaCQ-JKPdcCJo',
};

// Clé secrète pour protéger les écritures
const SECRET_KEY = 'printhub2026simpact';

// ── GET — Lecture ────────────────────────────────────────────────
function doGet(e) {
  const table = e.parameter.table;
  const id    = e.parameter.id;
  
  if (!table || !SHEETS[table]) {
    return jsonResponse({error: 'Table inconnue: ' + table});
  }
  
  try {
    const ss    = SpreadsheetApp.openById(SHEETS[table]);
    const sheet = ss.getSheets()[0];
    const data  = sheet.getDataRange().getValues();
    
    if (data.length === 0) return jsonResponse([]);
    
    const headers = data[0].map(h => String(h).trim());
    const rows    = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        let val = row[i];
        // Convertir les chaînes JSON (config, etc.)
        if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
          try { val = JSON.parse(val); } catch(_) {}
        }
        // Convertir les booléens
        if (val === 'TRUE' || val === true)  val = true;
        if (val === 'FALSE' || val === false) val = false;
        // Convertir les nombres
        if (val === '' || val === null) val = null;
        obj[h] = val;
      });
      return obj;
    }).filter(row => row.id); // Ignorer les lignes sans ID
    
    // Filtre par ID si demandé
    if (id) {
      const found = rows.find(r => String(r.id) === String(id));
      return jsonResponse(found || null);
    }
    
    return jsonResponse(rows);
  } catch(err) {
    return jsonResponse({error: err.toString()});
  }
}

// ── POST — Écriture ──────────────────────────────────────────────
function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const table  = body.table;
    const action = body.action; // 'upsert' | 'delete'
    const record = body.record;
    const key    = body.key;
    
    // Vérification clé secrète
    if (key !== SECRET_KEY) {
      return jsonResponse({error: 'Accès refusé'});
    }
    
    if (!table || !SHEETS[table]) {
      return jsonResponse({error: 'Table inconnue'});
    }
    
    const ss    = SpreadsheetApp.openById(SHEETS[table]);
    const sheet = ss.getSheets()[0];
    
    if (action === 'upsert') {
      upsertRow(sheet, record);
      return jsonResponse({success: true, id: record.id});
    }
    
    if (action === 'delete') {
      deleteRow(sheet, body.id);
      return jsonResponse({success: true});
    }
    
    if (action === 'clear_and_import') {
      // Import en masse (initialisation)
      bulkImport(sheet, body.records, body.headers);
      return jsonResponse({success: true, count: body.records.length});
    }
    
    return jsonResponse({error: 'Action inconnue: ' + action});
    
  } catch(err) {
    return jsonResponse({error: err.toString()});
  }
}

// ── Helpers ──────────────────────────────────────────────────────

function upsertRow(sheet, record) {
  const data    = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim());
  
  // Si la feuille est vide, créer les en-têtes
  if (headers.length === 0 || (headers.length === 1 && !headers[0])) {
    const newHeaders = Object.keys(record);
    sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
    data.push(newHeaders);
    headers.length = 0;
    newHeaders.forEach(h => headers.push(h));
  }
  
  // Chercher ligne existante par ID
  const idColIdx = headers.indexOf('id');
  let existingRow = -1;
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idColIdx]) === String(record.id)) {
      existingRow = i + 1; // 1-indexed
      break;
    }
  }
  
  // Construire la ligne selon l'ordre des headers
  const rowValues = headers.map(h => {
    const val = record[h];
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
  });
  
  if (existingRow > 0) {
    // Mise à jour
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([rowValues]);
  } else {
    // Insertion
    sheet.appendRow(rowValues);
  }
}

function deleteRow(sheet, id) {
  const data     = sheet.getDataRange().getValues();
  const headers  = data[0].map(h => String(h).trim());
  const idColIdx = headers.indexOf('id');
  
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][idColIdx]) === String(id)) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}

function bulkImport(sheet, records, headers) {
  // Effacer et reimporter
  sheet.clearContents();
  if (!records || records.length === 0) return;
  
  const allHeaders = headers || Object.keys(records[0]);
  const rows = [allHeaders];
  
  records.forEach(rec => {
    rows.push(allHeaders.map(h => {
      const val = rec[h];
      if (val === null || val === undefined) return '';
      if (typeof val === 'object') return JSON.stringify(val);
      return val;
    }));
  });
  
  sheet.getRange(1, 1, rows.length, allHeaders.length).setValues(rows);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
