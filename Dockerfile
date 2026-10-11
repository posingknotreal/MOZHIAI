FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    MOZHI_HOST=0.0.0.0 \
    MOZHI_PORT=7860 \
    MOZHI_DATA_DIR=/data \
    MOZHI_DB_PATH=/data/mozhi.sqlite3 \
    MOZHI_TESSERACT_LANG=tam+eng

RUN apt-get update && apt-get install -y --no-install-recommends \
      tesseract-ocr tesseract-ocr-tam tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py ./
COPY static ./static

EXPOSE 7860
VOLUME ["/data"]
CMD ["python", "app.py"]
