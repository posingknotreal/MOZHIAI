const $ = (q) => document.querySelector(q);
const $$ = (q) => [...document.querySelectorAll(q)];
const state = { documents: [], chats: [], chatId: null, activeView: 'chat', loading: false, viewerDoc: null, messageCache: [] };

async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function formatSize(n) { if (n < 1024) return `${n} B`; if (n < 1048576) return `${(n/1024).toFixed(0)} KB`; return `${(n/1048576).toFixed(1)} MB`; }
function toast(message, error = false) { const el = document.createElement('div'); el.className = `toast${error ? ' error' : ''}`; el.textContent = message; $('#toastRegion').append(el); setTimeout(() => el.remove(), 3800); }
function getSelectedDocs() { const value = $('#scopeSelect').value; return value === 'all' ? [] : [value]; }
function fileIcon(ext) { return `<span class="file-icon ${ext.slice(1)}">${escapeHtml(ext.slice(1).toUpperCase())}</span>`; }

async function refreshHealth() {
  try {
    const { provider } = await api('/api/health');
    const localHost = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
    $('#providerTitle').textContent = provider.llm ? 'AI provider configured' : provider.llmNeedsKey ? 'AI provider needs a key' : 'Local offline mode';
    $('#providerSub').textContent = provider.llm ? (provider.embedding ? 'Chat + multilingual embeddings configured' : provider.embeddingNeedsKey ? 'Chat online · embeddings need a key' : 'Chat + local hybrid search') : provider.llmNeedsKey ? 'Add the provider key in server settings' : 'Search & cited evidence ready';
    $('#providerDot').classList.toggle('warning', !provider.llm);
    $('#serviceChipLabel').textContent = provider.llm ? 'AI configured' : provider.llmNeedsKey ? 'AI setup needed' : 'Offline mode';
    $('#serviceChip').classList.toggle('configured', !!provider.llm);
    $('#serviceChip').classList.toggle('warning', !provider.llm);
    const configured = [provider.llm, provider.embedding, provider.ocrMode === 'remote', provider.vectorBackend.startsWith('qdrant')].some(Boolean);
    $('#privacyNote').textContent = configured ? 'Selected content may be sent to AI providers' : localHost ? 'Files & indexes stay on this device' : 'Files & indexes are stored on this server';
    $('#composerPrivacy').textContent = configured ? 'Configured providers' : 'Local processing';
    $('#settingsStatus').textContent = [
      `Database: ${provider.database}.`, `Vector search: ${provider.vectorBackend}.`,
      provider.llm ? 'Chat model: configured.' : provider.llmNeedsKey ? 'Chat model: URL and model are set, but its API key is missing.' : 'Chat model: not configured; offline evidence mode is active.',
      provider.embedding ? `Embeddings: ${provider.embeddingProvider} provider.` : provider.embeddingNeedsKey ? `Embeddings: ${provider.embeddingProvider} is set, but its key is missing.` : 'Embeddings: local feature-hash fallback; cross-language semantic matching may be limited.',
      provider.ocrMode === 'local' ? 'OCR: local Tesseract (Tamil + English).' : provider.ocrMode === 'remote' ? 'OCR: remote provider configured.' : 'OCR: Tesseract not found; scanned PDFs need OCR setup.'
    ].join(' ');
    $('#storageLabel').textContent = localHost ? 'Stored on this device' : 'Stored on this server';
  } catch { $('#providerTitle').textContent = 'Server unavailable'; $('#providerSub').textContent = 'Check the app connection'; $('#providerDot').classList.add('warning'); $('#serviceChipLabel').textContent = 'Service unavailable'; $('#serviceChip').classList.add('warning'); }
}

async function refreshDocuments() {
  const data = await api('/api/metrics'); state.documents = data.documents;
  renderDocuments(); renderScope(); renderLibrary();
}
function renderScope() {
  const select = $('#scopeSelect'), previous = select.value;
  select.innerHTML = '<option value="all">All documents</option>' + state.documents.filter(d => d.status === 'ready').map(d => `<option value="${d.id}">${escapeHtml(d.name)}</option>`).join('');
  if ([...select.options].some(o => o.value === previous)) select.value = previous;
  $('#docCount').textContent = String(state.documents.length); $('#panelDocCount').textContent = String(state.documents.length);
  const chosen = getSelectedDocs();
  $('#selectedDocs').classList.toggle('hidden', !chosen.length);
  $('#selectedDocs').innerHTML = chosen.map(id => { const doc = state.documents.find(d => d.id === id); return doc ? `<span class="selected-pill">${escapeHtml(doc.name)}</span>` : ''; }).join('');
}
function renderDocuments() {
  const query = $('#docSearch').value.trim().toLowerCase();
  const docs = state.documents.filter(d => d.name.toLowerCase().includes(query));
  const list = $('#documentList');
  if (!docs.length) {
    list.innerHTML = query ? '<div class="empty-docs"><strong>No matching documents</strong><span>Try another filename.</span></div>' : '<div class="empty-docs"><div class="empty-icon">▱</div><strong>No documents yet</strong><span>Upload a file to start asking questions.</span><button id="emptyUpload" class="secondary-button">Upload a document</button></div>';
    $('#emptyUpload')?.addEventListener('click', openFilePicker); return;
  }
  list.innerHTML = docs.map(d => `<div class="document-card" data-doc="${d.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(d.name)}">${fileIcon(d.extension)}<span class="file-meta"><strong>${escapeHtml(d.name)}</strong><small>${formatSize(d.size)}${d.pageCount ? ` · ${d.pageCount} pages` : ''}</small></span><span class="file-state ${d.status === 'error' ? 'error' : ''}">${d.status === 'processing' ? 'Queued…' : d.status === 'extracting' ? 'Extracting…' : d.status === 'indexing' ? 'Indexing…' : d.status === 'error' ? 'Needs attention' : d.warning ? 'Partial text' : 'Ready'}</span><button class="remove-doc" data-remove="${d.id}" title="Remove document" aria-label="Remove ${escapeHtml(d.name)}">×</button></div>${d.error ? `<div class="error-note" style="font-size:9px;color:#a75850;padding:0 8px 7px">${escapeHtml(d.error)}</div>` : d.warning ? `<div class="warning-note" style="font-size:9px;color:#9a783a;padding:0 8px 7px">${escapeHtml(d.warning)}</div>` : ''}`).join('');
  $$('.document-card').forEach(card => { card.addEventListener('click', e => { if (e.target.closest('.remove-doc')) return; openViewer(card.dataset.doc); }); card.addEventListener('keydown', e => { if (e.key === 'Enter') openViewer(card.dataset.doc); }); });
  $$('.remove-doc').forEach(button => button.addEventListener('click', e => { e.stopPropagation(); removeDocument(button.dataset.remove); }));
}
function renderLibrary() {
  $('#libraryCount').textContent = String(state.documents.length);
  $('#libraryPages').textContent = String(state.documents.filter(d => d.status === 'ready').reduce((sum, d) => sum + (d.pageCount || 0), 0));
  $('#libraryChunks').textContent = String(state.documents.filter(d => d.status === 'ready').reduce((sum, d) => sum + (d.chunkCount || 0), 0));
  const table = $('#libraryTable');
  if (!state.documents.length) { table.innerHTML = '<div class="empty-docs"><div class="empty-icon">▱</div><strong>Your library is empty</strong><span>Upload a PDF, DOCX, or TXT file to begin.</span><button class="secondary-button" id="libraryEmptyUpload">Upload a document</button></div>'; $('#libraryEmptyUpload')?.addEventListener('click', openFilePicker); return; }
  table.innerHTML = `<div class="library-row header"><span>DOCUMENT</span><span>SIZE</span><span>FORMAT</span><span>STATUS</span><span></span></div>` + state.documents.map(d => `<div class="library-row"><div class="library-name" data-open="${d.id}" role="button" tabindex="0">${fileIcon(d.extension)}<strong>${escapeHtml(d.name)}</strong></div><span>${formatSize(d.size)}</span><span>${d.extension.slice(1).toUpperCase()}</span><span class="file-state ${d.status === 'error' ? 'error' : ''}">${d.status === 'ready' ? d.warning ? 'Partial text' : 'Ready' : d.status === 'error' ? 'Error' : d.status === 'extracting' ? 'Extracting' : 'Indexing'}</span><button class="remove-doc" data-remove="${d.id}">Remove</button></div>${d.error ? `<div class="warning-note" style="font-size:9px;color:#a75850;padding:0 8px 7px">${escapeHtml(d.error)}</div>` : d.warning ? `<div class="warning-note" style="font-size:9px;color:#9a783a;padding:0 8px 7px">${escapeHtml(d.warning)}</div>` : ''}`).join('');
  $$('[data-open]').forEach(e => e.addEventListener('click', () => openViewer(e.dataset.open)));
  $$('.library-row .remove-doc').forEach(e => e.addEventListener('click', () => removeDocument(e.dataset.remove)));
}
async function removeDocument(id) {
  const doc = state.documents.find(d => d.id === id); if (!doc) return;
  if (!confirm(`Remove “${doc.name}” and its local indexed data? This cannot be undone.`)) return;
  try { await api(`/api/documents/${id}`, {method:'DELETE'}); if (state.viewerDoc === id) closeViewer(); await refreshDocuments(); toast('Document removed.'); }
  catch (error) { toast(error.message, true); }
}

function openFilePicker() { $('#fileInput').click(); }
async function uploadFiles(files) {
  const valid = [...files]; if (!valid.length) return;
  $('#uploadProgress').classList.remove('hidden');
  const form = new FormData(); valid.forEach(file => form.append('files', file));
  try {
    const data = await api('/api/documents', {method:'POST', body:form});
    await refreshDocuments();
    let attempts = 0;
    while (state.documents.some(d => ['processing','extracting','indexing'].includes(d.status)) && attempts++ < 180) {
      await new Promise(resolve => setTimeout(resolve, 650));
      await refreshDocuments();
    }
    const good = data.documents.filter(d => state.documents.find(x => x.id === d.id)?.status === 'ready').length;
    const bad = data.documents.filter(d => state.documents.find(x => x.id === d.id)?.status === 'error').length;
    toast(`${good} document${good === 1 ? '' : 's'} ready${bad ? ` · ${bad} need attention` : ''}${data.warning ? ' · Some unsupported files were skipped' : ''}.` , !!bad || !!data.warning);
  } catch (error) { toast(error.message, true); }
  finally { $('#uploadProgress').classList.add('hidden'); $('#fileInput').value = ''; }
}

function setView(name) {
  state.activeView = name;
  $('#chatView').classList.toggle('hidden', name !== 'chat'); $('#searchView').classList.toggle('hidden', name !== 'search'); $('#libraryView').classList.toggle('hidden', name !== 'library');
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  $('#viewTitle').textContent = name === 'chat' ? 'Ask documents' : name === 'search' ? 'Semantic search' : 'Document library';
  $('#sidebar').classList.remove('open');
  if (name === 'library') refreshDocuments().catch(e => toast(e.message, true));
}
function resetChat() { state.chatId = null; state.messageCache = []; $('#messages').innerHTML = ''; $('#messages').classList.add('hidden'); $('#welcome').classList.remove('hidden'); $('#messageInput').value = ''; $('#messageInput').focus(); $$('.history-item').forEach(el => el.classList.remove('selected')); }

function appendMessage(role, content, citations = [], pending = false) {
  $('#welcome').classList.add('hidden'); const list = $('#messages'); list.classList.remove('hidden');
  const id = `msg-${crypto.randomUUID()}`;
  const cites = citations.map(c => `<button class="citation-chip" data-citation="${escapeHtml(JSON.stringify(c))}" title="Open cited source">[${escapeHtml(c.sourceId)}] ${escapeHtml(c.document)}${c.page ? ` · p. ${c.page}` : ''}</button>`).join('');
  const contentHtml = pending ? '<div class="typing"><i></i><i></i><i></i></div>' : `<div class="message-content">${escapeHtml(content)}</div>${cites ? `<div class="citation-list">${cites}</div>` : ''}`;
  list.insertAdjacentHTML('beforeend', `<article class="message ${role}" id="${id}"><div class="message-avatar">${role === 'user' ? 'You' : 'மொ'}</div><div class="message-body"><div class="message-label">${role === 'user' ? 'YOU' : 'MOZHIAI'}</div>${contentHtml}</div></article>`);
  list.querySelectorAll('[data-citation]').forEach(b => { b.onclick = () => { try { const c = JSON.parse(b.dataset.citation); openViewer(c.documentId, c.page); } catch {} }; });
  list.scrollTop = list.scrollHeight; return id;
}
function renderMessages(messages) { $('#messages').innerHTML = ''; $('#messages').classList.toggle('hidden', !messages.length); $('#welcome').classList.toggle('hidden', !!messages.length); messages.forEach(m => appendMessage(m.role, m.content, m.citations || [])); }
async function sendChat(textOverride = null, mode = 'chat') {
  const input = $('#messageInput'); const message = (textOverride ?? input.value).trim();
  if (!message || state.loading) return;
  if (!state.documents.some(d => d.status === 'ready')) { toast('Upload a document first so answers can be grounded in your sources.', true); return; }
  input.value = ''; resizeInput(); state.loading = true; $('#sendButton').disabled = true;
  appendMessage('user', message); const pending = appendMessage('assistant', '', [], true);
  try {
    const data = await api('/api/chat', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatId:state.chatId,message,documentIds:getSelectedDocs(),mode})});
    state.chatId = data.chatId; document.getElementById(pending)?.remove(); appendMessage('assistant', data.answer, data.citations);
    await refreshChats();
  } catch (error) { document.getElementById(pending)?.remove(); appendMessage('assistant', `I couldn’t complete that request: ${error.message}`); toast(error.message, true); }
  finally { state.loading = false; $('#sendButton').disabled = false; input.focus(); }
}
async function quickAction(mode) {
  const text = $('#messageInput').value.trim();
  if (!text && !state.documents.some(d => d.status === 'ready')) { toast('Upload or select a document first.', true); return; }
  state.loading = true;
  try {
    const data = await api('/api/action', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,text,chatId:state.chatId,documentIds:getSelectedDocs()})});
    if (text) $('#messageInput').value = '';
    appendMessage('user', `${mode[0].toUpperCase()+mode.slice(1)}${text ? `: ${text}` : ' selected document(s)'}`);
    appendMessage('assistant', data.answer, data.citations);
    state.chatId = data.chatId; await refreshChats();
  } catch (error) { toast(error.message, true); }
  finally { state.loading = false; }
}
async function refreshChats() {
  const {chats} = await api('/api/chats'); state.chats = chats;
  $('#chatList').innerHTML = chats.length ? chats.map(c => `<button class="history-item ${c.id === state.chatId ? 'selected' : ''}" data-chat="${c.id}" title="${escapeHtml(c.title)}">${escapeHtml(c.title)}</button>`).join('') : '<div class="empty-side">Your conversations will appear here.</div>';
  $$('.history-item').forEach(button => button.addEventListener('click', () => loadChat(button.dataset.chat)));
}
async function loadChat(id) {
  try { const data = await api(`/api/chats/${id}`); state.chatId = id; renderMessages(data.messages); await refreshChats(); setView('chat'); }
  catch (error) { toast(error.message, true); }
}

async function doSearch() {
  const q = $('#searchInput').value.trim(); if (!q) return;
  $('#searchMeta').textContent = 'Searching indexed passages…'; $('#searchResults').innerHTML = '';
  try {
    const {results} = await api(`/api/search?q=${encodeURIComponent(q)}${getSelectedDocs().map(id => `&documentId=${encodeURIComponent(id)}`).join('')}`);
    $('#searchMeta').textContent = `${results.length} matching passage${results.length === 1 ? '' : 's'} · local hybrid ranking`;
    $('#searchResults').innerHTML = results.length ? results.map(r => `<article class="result-card"><div class="result-meta">${fileIcon(state.documents.find(d => d.id === r.documentId)?.extension || '.txt')}<strong>${escapeHtml(r.document)}</strong>${r.page ? `· Page ${r.page}` : '· Page unavailable'}<button data-result="${r.documentId}" data-page="${r.page || ''}">Open source ↗</button></div><p>${escapeHtml(r.content)}</p></article>`).join('') : '<div class="empty-docs"><strong>No matching passages</strong><span>Try a different phrase or upload more documents.</span></div>';
    $$('[data-result]').forEach(b => b.addEventListener('click', () => openViewer(b.dataset.result, b.dataset.page ? Number(b.dataset.page) : null)));
  } catch (error) { $('#searchMeta').textContent = error.message; }
}

async function openViewer(id, page = null) {
  const doc = state.documents.find(d => d.id === id); if (!doc) return;
  state.viewerDoc = id; $('#viewerTitle').textContent = doc.name; $('#viewer').classList.remove('hidden'); $('#viewerBackdrop').classList.remove('hidden');
  const pdf = doc.extension === '.pdf'; $('#pdfTools').classList.toggle('hidden', !pdf);
  if (pdf) {
    $('#pageNumber').max = doc.pageCount || ''; $('#pageNumber').value = page || 1; $('#pageTotal').textContent = doc.pageCount ? `of ${doc.pageCount}` : '';
    $('#viewerContent').innerHTML = `<iframe title="${escapeHtml(doc.name)}" src="/api/documents/${id}/file#page=${page || 1}&view=FitH"></iframe>`;
  } else {
    $('#viewerContent').innerHTML = '<div class="text-preview">Loading document…</div>';
    try { const {text} = await api(`/api/documents/${id}/text`); $('#viewerContent').innerHTML = `<div class="text-preview">${escapeHtml(text)}</div>`; }
    catch (error) { $('#viewerContent').innerHTML = `<div class="text-preview">${escapeHtml(error.message)}</div>`; }
  }
}
function closeViewer() { $('#viewer').classList.add('hidden'); $('#viewerBackdrop').classList.add('hidden'); state.viewerDoc = null; }
function goPage(page) { if (!state.viewerDoc) return; const doc = state.documents.find(d => d.id === state.viewerDoc); const p = Math.max(1, Math.min(Number(page) || 1, doc.pageCount || 99999)); $('#pageNumber').value = p; $('#viewerContent iframe').src = `/api/documents/${state.viewerDoc}/file#page=${p}&view=FitH`; }
function resizeInput() { const el = $('#messageInput'); el.style.height = 'auto'; el.style.height = `${Math.min(el.scrollHeight, 140)}px`; }

$('#browseFiles').addEventListener('click', openFilePicker); $('#attachButton').addEventListener('click', openFilePicker); $('#panelAdd').addEventListener('click', openFilePicker); $('#emptyUpload')?.addEventListener('click', openFilePicker); $('#libraryUpload').addEventListener('click', openFilePicker); $('#fileInput').addEventListener('change', e => uploadFiles(e.target.files));
$('#dropZone').addEventListener('dragover', e => { e.preventDefault(); $('#dropZone').classList.add('dragover'); });
$('#dropZone').addEventListener('dragleave', () => $('#dropZone').classList.remove('dragover'));
$('#dropZone').addEventListener('drop', e => { e.preventDefault(); $('#dropZone').classList.remove('dragover'); uploadFiles(e.dataTransfer.files); });
$('#docSearch').addEventListener('input', renderDocuments); $('#scopeSelect').addEventListener('change', renderScope);
$('#chatForm').addEventListener('submit', e => { e.preventDefault(); sendChat(); }); $('#messageInput').addEventListener('input', resizeInput);
$('#messageInput').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } });
$$('.starter-card').forEach(card => card.addEventListener('click', () => { $('#messageInput').value = card.dataset.prompt; if (state.documents.some(d => d.status === 'ready')) sendChat(); else { $('#messageInput').focus(); toast('Upload a document to get started.'); } }));
$$('.nav-item').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
$('#newChat').addEventListener('click', resetChat); $('#clearChatFilter').addEventListener('click', resetChat);
$('#searchButton').addEventListener('click', doSearch); $('#searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
$('#closeViewer').addEventListener('click', closeViewer); $('#viewerBackdrop').addEventListener('click', closeViewer); $('#goToPage').addEventListener('click', () => goPage($('#pageNumber').value)); $('#pageNumber').addEventListener('keydown', e => { if (e.key === 'Enter') goPage(e.target.value); }); $('#previousPage').addEventListener('click', () => goPage(Number($('#pageNumber').value)-1)); $('#nextPage').addEventListener('click', () => goPage(Number($('#pageNumber').value)+1));
$('#settingsButton').addEventListener('click', () => $('#settingsDialog').showModal());
$('#serviceChip').addEventListener('click', () => $('#settingsDialog').showModal());
$('#openSidebar').addEventListener('click', () => $('#sidebar').classList.add('open')); $('#closeSidebar').addEventListener('click', () => $('#sidebar').classList.remove('open'));
$$('.composer-tools').forEach(() => {});
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); resetChat(); } if (e.key === 'Escape') closeViewer(); });
$('#searchView').querySelector('.large-search input').setAttribute('aria-label', 'Search your documents');

// Add feature actions beside the document scope without exposing provider keys in the client.
const actionBar = document.createElement('span'); actionBar.className = 'quick-actions'; actionBar.innerHTML = '<button type="button" data-mode="summary">Summarize</button><button type="button" data-mode="explain">Explain</button><button type="button" data-mode="translate">Translate</button>';
$('.composer-tools').append(actionBar);
actionBar.querySelectorAll('button').forEach(button => button.addEventListener('click', () => quickAction(button.dataset.mode)));

Promise.all([refreshHealth(), refreshDocuments(), refreshChats()]).catch(error => toast(error.message, true));
