// The Apps Script the admin pastes into their Google Form (Extensions -> Apps Script).
// Rendered in Settings with this site's endpoint and the connection key filled in.
export function googleFormsScript(endpoint: string, token: string): string {
  return `// AR Medias: send this Google Form's responses to the armedias.com lead dashboard.
// Paste into the FORM's Apps Script editor (Extensions -> Apps Script), save, then run
// "setup" once and allow access. Keep the key below private.
const ENDPOINT = ${JSON.stringify(endpoint)};
const KEY = ${JSON.stringify(token)};
const MAX_BATCH_CHARS = 45000; // the server accepts up to 64 KB per request

/** Run once: installs the triggers and imports every existing response. */
function setup() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('onSubmit').forForm(FormApp.getActiveForm()).onFormSubmit().create();
  ScriptApp.newTrigger('retryPending').timeBased().everyMinutes(15).create();
  Logger.log(JSON.stringify(importAll()));
}

/** Sends each new response as soon as it is submitted. */
function onSubmit(e) {
  send_([toPayload_(e.response)], 'submit');
}

/** Every 15 minutes: resends responses that could not be delivered earlier. */
function retryPending() {
  const props = PropertiesService.getScriptProperties();
  const ids = JSON.parse(props.getProperty('pending') || '[]');
  if (!ids.length) return;
  props.setProperty('pending', '[]');
  const form = FormApp.getActiveForm();
  const list = [];
  ids.forEach(function (id) { try { list.push(toPayload_(form.getResponse(id))); } catch (err) {} });
  send_(list, 'retry');
}

/** Responses from the last 7 days (already imported ones are skipped by the server). */
function syncRecent() {
  return send_(FormApp.getActiveForm().getResponses(new Date(Date.now() - 7 * 86400000)).map(toPayload_), 'recent');
}

/** Every response the form has ever received. */
function importAll() {
  return send_(FormApp.getActiveForm().getResponses().map(toPayload_), 'all');
}

/** "Sync now" in the armedias.com admin calls this (deploy as a web app). */
function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== KEY) return json_({ ok: false, error: 'unauthorized' });
  const result = e.parameter.mode === 'all' ? importAll() : syncRecent();
  return json_(Object.assign({ ok: true }, result));
}

function toPayload_(r) {
  const answers = {};
  r.getItemResponses().forEach(function (ir) {
    let v = ir.getResponse();
    if (Array.isArray(v)) v = v.map(function (x) { return Array.isArray(x) ? x.join(' / ') : x; }).join(', ');
    answers[ir.getItem().getTitle()] = String(v).slice(0, 4000);
  });
  const email = r.getRespondentEmail();
  if (email) answers['Email address'] = email;
  return { responseId: r.getId(), submittedAt: r.getTimestamp().toISOString(), answers: answers };
}

function send_(responses, trigger) {
  const totals = { sent: 0, inserted: 0, failed: 0 };
  let batch = [];
  const flush = function () {
    if (!batch.length) return;
    const form = FormApp.getActiveForm();
    const body = JSON.stringify({ formId: form.getId(), formTitle: form.getTitle(), trigger: trigger, responses: batch });
    let ok = false;
    try {
      const res = UrlFetchApp.fetch(ENDPOINT, {
        method: 'post', contentType: 'application/json', payload: body, muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + KEY },
      });
      const out = JSON.parse(res.getContentText() || '{}');
      ok = res.getResponseCode() === 200 && out.ok;
      if (ok) { totals.inserted += out.inserted; totals.failed += out.failed; }
    } catch (err) {}
    totals.sent += batch.length;
    if (!ok) {
      totals.failed += batch.length;
      const props = PropertiesService.getScriptProperties();
      const pending = JSON.parse(props.getProperty('pending') || '[]');
      batch.forEach(function (r) { if (pending.indexOf(r.responseId) < 0) pending.push(r.responseId); });
      props.setProperty('pending', JSON.stringify(pending.slice(-500)));
    }
    batch = [];
  };
  let size = 0;
  responses.forEach(function (r) {
    const n = JSON.stringify(r).length + 1;
    if (batch.length && size + n > MAX_BATCH_CHARS) { flush(); size = 0; }
    batch.push(r);
    size += n;
  });
  flush();
  return totals;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
`;
}
