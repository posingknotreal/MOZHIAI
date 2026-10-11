---
title: MOZHIAI
emoji: 🪷
colorFrom: indigo
colorTo: yellow
sdk: docker
app_port: 7860
---

# MOZHIAI

Tamil-first document workspace with persistent local document storage, page-aware extraction, hybrid retrieval, and grounded chat.

## Run locally

1. Install Python 3.10+ and the document libraries:

   ```powershell
   py -m pip install -r requirements.txt
   ```

   PDF/DOCX upload shows a clear error if a required library is unavailable; TXT works with Python alone. The Python packages also render PDF pages for local OCR.

2. For scanned PDFs, install the free Tesseract OCR engine and its **Tamil (`tam`) and English (`eng`) language data**. See the [Tesseract installation guide](https://tesseract-ocr.github.io/tessdoc/Installation.html) and [language data list](https://github.com/tesseract-ocr/tessdoc/blob/main/Data-Files.md). Make sure `tesseract.exe` is on PATH, or set `MOZHI_TESSERACT_CMD` to its full path. No OCR API key or cloud service is required.

3. Start the server from this directory:

   ```powershell
   py app.py
   ```

4. Open <http://127.0.0.1:8765>.

The app stores its SQLite database and uploaded files under `data/`. It is a single-user local app and does not expose API keys to the browser.

## Optional AI providers

Set these in the server environment before starting the app:

- `MOZHI_LLM_BASE_URL` — OpenAI-compatible chat completions URL (for example, an Ollama-compatible `/v1` endpoint).
- `MOZHI_LLM_API_KEY` — provider key, if required. Keep it in the server environment only.
- `MOZHI_LLM_MODEL` — model identifier.
- `MOZHI_EMBEDDING_PROVIDER` — `openai` for an OpenAI-compatible endpoint or `huggingface` for HF Inference Providers feature extraction.
- `MOZHI_EMBEDDING_BASE_URL` — optional embedding API root; HF defaults to `https://router.huggingface.co/hf-inference/models`.
- `MOZHI_EMBEDDING_API_KEY` — optional separate embedding key; HF mode can reuse the server-side `MOZHI_LLM_API_KEY`.
- `MOZHI_EMBEDDING_MODEL` — embedding model ID; a multilingual HF option is `BAAI/bge-m3`.
- `MOZHI_TESSERACT_CMD` — optional path override for the local `tesseract` executable.
- `MOZHI_TESSERACT_LANG` — OCR language codes joined with `+`; defaults to `tam+eng`.
- `MOZHI_OCR_DPI` — PDF render resolution; defaults to 240 and is limited to 120–300 DPI.
- `MOZHI_OCR_BASE_URL` / `MOZHI_OCR_API_KEY` — optional remote OCR adapter; if set, it overrides local Tesseract and receives PDF bytes at `POST {base}/ocr` with `application/pdf`, returning `{"pages":[{"page":1,"text":"..."}]}`.
- `MOZHI_VECTOR_BACKEND` — `sqlite` by default, or `qdrant` to opt into Qdrant for vector search.
- `MOZHI_QDRANT_URL` — Qdrant REST base URL (for example `http://localhost:6333`).
- `MOZHI_QDRANT_API_KEY` — optional Qdrant API key.
- `MOZHI_QDRANT_COLLECTION` — collection name; defaults to `mozhiai`.
- `MOZHI_DATA_DIR` — local storage directory; defaults to `./data`.
- `MOZHI_DB_PATH` — SQLite file path; defaults to `./data/mozhi.sqlite3`.
- `MOZHI_HOST` / `MOZHI_PORT` — server bind address and port; defaults to `127.0.0.1:8765`.

For example, to use an already running OpenAI-compatible local model from PowerShell:

```powershell
$env:MOZHI_LLM_BASE_URL = "http://localhost:11434/v1"
$env:MOZHI_LLM_MODEL = "your-local-model-name"
py app.py
```

For a hosted provider, also set `MOZHI_LLM_API_KEY` in the server environment. Keys are read only by the Python server; the browser never receives them. The default database and vector store need no separate service: they live in SQLite at `data/mozhi.sqlite3`. If using Qdrant, run your Qdrant service separately; MOZHIAI creates the configured collection on first use and still keeps a local SQLite fallback.

For Hugging Face Inference Providers, use `MOZHI_LLM_BASE_URL=https://router.huggingface.co/v1`, a chat model ID with an available provider, and a token with **Make calls to Inference Providers** permission. For multilingual hosted embeddings using that same token, set `MOZHI_EMBEDDING_PROVIDER=huggingface`, `MOZHI_EMBEDDING_BASE_URL=https://router.huggingface.co/hf-inference/models`, and `MOZHI_EMBEDDING_MODEL=BAAI/bge-m3`. Provider credit and model availability limits apply. Set embedding configuration before uploading documents so indexed and query vectors use the same model.

When no AI endpoint is configured, documents remain searchable with local BM25 and deterministic feature-hash vectors stored in SQLite. Offline answers are source excerpts with citations; translation clearly reports that a language model is required instead of returning a fake translation. Offline summary is extractive; explain mode shows relevant evidence and says when a generated explanation needs a language model. Qdrant is an optional vector backend with SQLite fallback. A configured remote OCR adapter, or local Tesseract when available, is called only for PDF pages with no extractable text. Rendering and recognition happen locally by default.

Without the Tesseract executable and requested language data, image-only/scanned PDFs are reported as unreadable. Remote OCR and Qdrant integrations are optional and send document bytes or vectors to the configured endpoint; leave those variables unset for local-only processing.

## What works

- TXT, PDF, and DOCX upload, extraction, persistence, removal, and processing state.
- Tamil Unicode NFC normalization, control/zero-width cleanup, and whitespace normalization.
- Page-aware chunking, lexical BM25, deterministic local feature-hash cosine retrieval, hybrid ranking, and an overlap-based rerank pass.
- Grounded Q&A with chunk/page citations and follow-up messages stored in local chat history.
- LLM-backed chat, summary, explain, and translation through a server-side OpenAI-compatible endpoint.
- Offline evidence chat, extractive summary, explain evidence, and local lexical/feature-hash search.
- PDF viewer with source-page navigation; extracted-text viewer for DOCX/TXT.
- Responsive layout and explicit provider/processing status.

## Public deployment

The included Dockerfile is compatible with Hugging Face Docker Spaces and other container hosts. Set these as **server-side secrets/environment variables** on the host, never in browser code:

- `MOZHI_AUTH_USER` — login name.
- `MOZHI_AUTH_PASSWORD` — a long, unique password. The app refuses a non-local network bind if either is missing.
- `MOZHI_LLM_BASE_URL`, `MOZHI_LLM_API_KEY`, `MOZHI_LLM_MODEL` — optional hosted chat provider.

The app uses HTTP Basic Authentication for one account (the browser displays its standard login prompt). The host must provide HTTPS. Local documents and chat history are stored in `/data`; attach persistent storage there if the host supports it. Without persistent storage, those files may disappear when a free instance restarts or sleeps. Do not upload private documents to a public deployment unless you trust the host and have persistence configured.

To run the container locally:

```powershell
docker build -t mozhiai .
docker run --rm -p 7860:7860 -e MOZHI_AUTH_USER=owner -e MOZHI_AUTH_PASSWORD='replace-with-a-long-unique-password' -v mozhiai-data:/data mozhiai
```

For a no-cost prototype, `render.yaml` configures a Render free web service. Connect a Git repository containing this folder as its root, deploy the Blueprint, then enter `MOZHI_AUTH_USER` and `MOZHI_AUTH_PASSWORD` (and optional LLM secrets) in the Render service environment. Render free services sleep when idle and use ephemeral disks: uploaded files, the SQLite database, and chat history are erased on restart, sleep, or redeploy. Treat that deployment as a demo with disposable data, not durable storage. A public git host may expose the source code, but `.dockerignore` excludes local uploads, databases, and `.env` files from the container build.

Hugging Face is not a no-cost Docker host for new compute Spaces under its current rules: creating a Docker Space requires a paid plan. Its default disk is also ephemeral; a Storage Bucket mounted at `/data` is the durable-storage option and may involve charges. The app URL remains public, with the app login guarding its contents.

## Checks

```powershell
py -m pip install -r requirements-dev.txt
py -m unittest discover -s tests -v
py -m py_compile app.py tests\test_app.py
node --check static\app.js
```
