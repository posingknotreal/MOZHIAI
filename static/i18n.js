(() => {
  const translations = {
    'Tamil intelligence': 'தமிழ் நுண்ணறிவு',
    'Close menu': 'பட்டியை மூடு', 'Open menu': 'பட்டியைத் திற',
    'New conversation': 'புதிய உரையாடல்', 'WORKSPACE': 'பணியிடம்',
    'Ask your documents': 'ஆவணங்களிடம் கேளுங்கள்', 'Ask documents': 'ஆவணங்களிடம் கேளுங்கள்',
    'Semantic search': 'பொருள் சார்ந்த தேடல்', 'Document library': 'ஆவண நூலகம்',
    'Clear selected chat': 'தேர்ந்த உரையாடலை நீக்கு',
    'RECENT CHATS': 'சமீபத்திய உரையாடல்கள்', 'Your conversations will appear here.': 'உங்கள் உரையாடல்கள் இங்கே தோன்றும்.',
    'Checking services…': 'சேவைகளைச் சரிபார்க்கிறது…', 'Private local workspace': 'தனிப்பட்ட உள்ளகப் பணியிடம்',
    'AI provider configured': 'AI சேவை அமைக்கப்பட்டுள்ளது', 'Chat + multilingual embeddings configured': 'அரட்டை மற்றும் பல்மொழி எம்பெட்டிங்குகள் அமைக்கப்பட்டுள்ளன',
    'Chat + local hybrid search': 'அரட்டை மற்றும் உள்ளகக் கலப்பு தேடல்', 'AI provider needs a key': 'AI சேவைக்கு திறவுகோல் தேவை',
    'Add the provider key in server settings': 'சேவையக அமைப்புகளில் சேவைத் திறவுகோலைச் சேர்க்கவும்',
    'Search & cited evidence ready': 'தேடலும் ஆதார மேற்கோள்களும் தயார்', 'Local offline mode': 'உள்ளக இணையமற்ற பயன்முறை',
    'AI configured': 'AI அமைக்கப்பட்டது', 'AI setup needed': 'AI அமைப்பு தேவை', 'Offline mode': 'இணையமற்ற பயன்முறை',
    'Service unavailable': 'சேவை கிடைக்கவில்லை', 'Server unavailable': 'சேவையகம் கிடைக்கவில்லை', 'Check the app connection': 'செயலி இணைப்பைச் சரிபார்க்கவும்',
    'Setup and settings': 'அமைப்பு மற்றும் விருப்பங்கள்', 'Files & indexes stay on this device': 'கோப்புகளும் குறியீடுகளும் இந்தச் சாதனத்தில் இருக்கும்',
    'Files & indexes are stored on this server': 'கோப்புகளும் குறியீடுகளும் இந்தச் சேவையகத்தில் சேமிக்கப்படும்',
    'Selected content may be sent to AI providers': 'தேர்ந்த உள்ளடக்கம் AI சேவைகளுக்கு அனுப்பப்படலாம்',
    'Configured providers': 'அமைக்கப்பட்ட சேவைகள்', 'Local processing': 'உள்ளகச் செயலாக்கம்',
    'Workspace': 'பணியிடம்', 'TAMIL-FIRST DOCUMENT INTELLIGENCE': 'தமிழை முன்னிலைப்படுத்தும் ஆவண நுண்ணறிவு',
    'Vanakkam.': 'வணக்கம்.',
    'Bring your Tamil and English documents. Ask naturally—in Tamil, English, Tanglish, or all three.': 'உங்கள் தமிழ் மற்றும் ஆங்கில ஆவணங்களைச் சேர்க்கவும். தமிழ், ஆங்கிலம் அல்லது தங்கிலீஷில் இயல்பாகக் கேளுங்கள்.',
    'Drop documents here, or': 'ஆவணங்களை இங்கே இழுத்துவிடுங்கள், அல்லது', 'browse files': 'கோப்புகளைத் தேர்ந்தெடுக்கவும்',
    'PDF, DOCX or TXT · up to 30 MB per file': 'PDF, DOCX அல்லது TXT · ஒவ்வொரு கோப்பும் 30 MB வரை',
    'START WITH A QUESTION': 'ஒரு கேள்வியுடன் தொடங்குங்கள்',
    'Understand a document': 'ஆவணத்தைப் புரிந்துகொள்ளுங்கள்', '“இந்த document-ல என்ன இருக்கு?”': '“இந்த ஆவணத்தில் என்ன இருக்கிறது?”',
    'Get a quick summary': 'விரைவான சுருக்கம் பெறுங்கள்', 'Turn long files into clear takeaways': 'நீண்ட ஆவணங்களின் முக்கியக் கருத்துகளை அறியுங்கள்',
    'Explain it simply': 'எளிமையாக விளக்குங்கள்', 'Make technical ideas easier to follow': 'தொழில்நுட்பக் கருத்துகளை எளிதாகப் புரிந்துகொள்ளுங்கள்',
    'Answers cite the exact document and page when available.': 'முடிந்தவரை பதில்களில் சரியான ஆவணமும் பக்கமும் மேற்கோள் காட்டப்படும்.',
    'Ask in Tamil, English, or Tanglish…': 'தமிழ், ஆங்கிலம் அல்லது தங்கிலீஷில் கேளுங்கள்…',
    'Ask a question': 'ஒரு கேள்வியைக் கேளுங்கள்', 'Add documents': 'ஆவணங்களைச் சேர்க்கவும்', 'Add files': 'கோப்புகளைச் சேர்க்கவும்',
    'Voice input language': 'குரல் உள்ளீட்டு மொழி', 'Choose the language you will speak': 'நீங்கள் பேசும் மொழியைத் தேர்ந்தெடுக்கவும்',
    'Speak your question; review the transcription before sending': 'கேள்வியைப் பேசுங்கள்; அனுப்புவதற்கு முன் உரையைச் சரிபார்க்கவும்',
    'Speak': 'பேசுங்கள்', 'Stop': 'நிறுத்து', 'All documents': 'அனைத்து ஆவணங்களும்',
    'Local processing': 'உள்ளகச் செயலாக்கம்', 'Document scope': 'ஆவண வரம்பு', 'Send message': 'செய்தியை அனுப்பு',
    'MOZHIAI can make mistakes. Verify important details in the cited source.': 'MOZHIAI தவறுகள் செய்யலாம். முக்கியத் தகவல்களை மேற்கோள் காட்டிய மூலத்தில் சரிபார்க்கவும்.',
    'Voice audio may be processed by your browser’s speech service. Review the transcription before sending.': 'குரல் ஒலி உங்கள் உலாவியின் பேச்சுச் சேவையால் செயலாக்கப்படலாம். அனுப்புவதற்கு முன் உரைமாற்றத்தைச் சரிபார்க்கவும்.',
    'YOUR KNOWLEDGE BASE': 'உங்கள் அறிவுத் தொகுப்பு', 'Documents': 'ஆவணங்கள்', 'Documents ': 'ஆவணங்கள் ', 'Upload documents': 'ஆவணங்களைப் பதிவேற்றவும்',
    'Find a document': 'ஆவணத்தைத் தேடுங்கள்', 'No documents yet': 'இன்னும் ஆவணங்கள் இல்லை',
    'Upload a file to start asking questions.': 'கேள்விகளைக் கேட்க ஒரு கோப்பைப் பதிவேற்றவும்.',
    'Upload a document': 'ஒரு ஆவணத்தைப் பதிவேற்றவும்', 'No matching documents': 'பொருந்தும் ஆவணங்கள் இல்லை',
    'Try another filename.': 'வேறு கோப்புப் பெயரை முயற்சிக்கவும்.', 'Queued…': 'வரிசையில்…', 'Extracting…': 'உரையைப் பிரித்தெடுக்கிறது…',
    'Indexing…': 'குறியிடுகிறது…', 'Needs attention': 'கவனம் தேவை', 'Partial text': 'பகுதி உரை', 'Ready': 'தயார்',
    'Remove document': 'ஆவணத்தை அகற்று', 'Stored on this device': 'இந்தச் சாதனத்தில் சேமிக்கப்பட்டது',
    'Stored on this server': 'இந்தச் சேவையகத்தில் சேமிக்கப்பட்டது', 'FIND MEANING, NOT JUST MATCHING WORDS': 'சொற்களை மட்டும் அல்ல, பொருளையும் தேடுங்கள்',
    'Search your knowledge.': 'உங்கள் அறிவைத் தேடுங்கள்.',
    'Look across document passages using lexical and local semantic signals.': 'சொல் பொருத்தம் மற்றும் உள்ளகப் பொருள் சுட்டிகளைப் பயன்படுத்தி ஆவணப் பகுதிகளைத் தேடுங்கள்.',
    'Search in Tamil, English, or Tanglish…': 'தமிழ், ஆங்கிலம் அல்லது தங்கிலீஷில் தேடுங்கள்…', 'Search': 'தேடு',
    'Upload documents to search your knowledge base.': 'உங்கள் அறிவுத் தொகுப்பைத் தேட ஆவணங்களைப் பதிவேற்றவும்.',
    'YOUR PRIVATE KNOWLEDGE BASE': 'உங்கள் தனிப்பட்ட அறிவுத் தொகுப்பு',
    'Manage the source files MOZHIAI can search and cite.': 'MOZHIAI தேடி மேற்கோள் காட்டக்கூடிய மூலக் கோப்புகளை நிர்வகிக்கவும்.',
    'documents': 'ஆவணங்கள்', 'PDF pages indexed': 'குறியிடப்பட்ட PDF பக்கங்கள்', 'searchable passages': 'தேடக்கூடிய பகுதிகள்',
    'SOURCE DOCUMENT': 'மூல ஆவணம்', 'Document': 'ஆவணம்', 'Page': 'பக்கம்', 'of': 'இல்', 'Go': 'செல்',
    'Previous page': 'முந்தைய பக்கம்', 'Next page': 'அடுத்த பக்கம்', 'Close viewer': 'காட்சியை மூடு',
    'WORKSPACE STATUS': 'பணியிட நிலை', 'Service status': 'சேவை நிலை',
    'Document tools work without an AI key.': 'AI திறவுகோல் இல்லாமலும் ஆவணக் கருவிகள் செயல்படும்.',
    'Extraction, storage, search, and citations are handled by the app server. Generated answers and translation require a configured online chat provider.': 'உரைப் பிரித்தெடுத்தல், சேமிப்பு, தேடல் மற்றும் மேற்கோள்களைச் செயலியின் சேவையகம் கையாளுகிறது. பதில் உருவாக்கவும் மொழிபெயர்க்கவும் இணைய AI சேவை அமைக்கப்பட்டிருக்க வேண்டும்.',
    'Server configuration': 'சேவையக அமைப்பு', 'Done': 'முடிந்தது', 'Close': 'மூடு',
    'Open cited source': 'மேற்கோள் காட்டிய மூலத்தைத் திற', 'YOU': 'நீங்கள்', 'You': 'நீங்கள்',
    'Summarize': 'சுருக்கம்', 'Explain': 'விளக்குக', 'Translate': 'மொழிபெயர்க்க',
    'Loading document…': 'ஆவணம் ஏற்றப்படுகிறது…', 'Searching indexed passages…': 'குறியிடப்பட்ட பகுதிகளைத் தேடுகிறது…',
    'Open source ↗': 'மூலத்தைத் திற ↗', 'Page unavailable': 'பக்கத் தகவல் இல்லை', 'No matching passages': 'பொருந்தும் பகுதிகள் இல்லை',
    'Try a different phrase or upload more documents.': 'வேறு சொற்றொடரை முயற்சிக்கவும் அல்லது மேலும் ஆவணங்களைப் பதிவேற்றவும்.',
    'Upload a document first so answers can be grounded in your sources.': 'உங்கள் ஆவணங்களின் அடிப்படையில் பதில்களைப் பெற முதலில் ஒரு ஆவணத்தைப் பதிவேற்றவும்.',
    'Upload or select a document first.': 'முதலில் ஓர் ஆவணத்தைப் பதிவேற்றவும் அல்லது தேர்ந்தெடுக்கவும்.',
    'Upload a document to get started.': 'தொடங்க ஓர் ஆவணத்தைப் பதிவேற்றவும்.',
    'Transcription added. Review or edit it before sending.': 'பேச்சு உரையாக மாற்றப்பட்டது. அனுப்புவதற்கு முன் சரிபார்க்கவும் அல்லது திருத்தவும்.',
    'Recording stopped. Review the transcription, then send it.': 'பதிவு நிறுத்தப்பட்டது. உரையைச் சரிபார்த்துப் பிறகு அனுப்பவும்.',
    'Recording stopped. Review the transcription, then try the action again.': 'பதிவு நிறுத்தப்பட்டது. உரையைச் சரிபார்த்துப் பிறகு மீண்டும் முயற்சிக்கவும்.',
    'Finishing voice input…': 'குரல் உள்ளீட்டை முடிக்கிறது…', 'Listening in தமிழ்…': 'தமிழில் கேட்கிறது…',
    'Listening in English…': 'ஆங்கிலத்தில் கேட்கிறது…', 'Hearing your question…': 'உங்கள் கேள்வியைக் கேட்கிறது…',
    'No speech was captured. Tap Speak to try again.': 'பேச்சு பதிவாகவில்லை. மீண்டும் முயற்சிக்க “பேசுங்கள்” என்பதைத் தட்டவும்.',
    'Voice recognition is not available in this browser. Type your question instead.': 'இந்த உலாவியில் குரல் அடையாளம் காணல் இல்லை. உங்கள் கேள்வியைத் தட்டச்சு செய்யவும்.',
    'Voice input requires a secure connection (HTTPS). You can type your question instead.': 'குரல் உள்ளீட்டிற்குப் பாதுகாப்பான இணைப்பு (HTTPS) தேவை. கேள்வியைத் தட்டச்சு செய்யலாம்.',
    'Microphone access was denied. Allow microphone access for this site, then try again.': 'ஒலிவாங்கி அனுமதி மறுக்கப்பட்டது. இந்தத் தளத்திற்கு அனுமதி அளித்து மீண்டும் முயற்சிக்கவும்.',
    'The browser did not allow its speech service. You can type your question instead.': 'உலாவி பேச்சுச் சேவையை அனுமதிக்கவில்லை. கேள்வியைத் தட்டச்சு செய்யலாம்.',
    'No microphone was found. Check your microphone or type your question.': 'ஒலிவாங்கி கிடைக்கவில்லை. அதைச் சரிபார்க்கவும் அல்லது கேள்வியைத் தட்டச்சு செய்யவும்.',
    'The browser speech service could not be reached. You can type your question instead.': 'உலாவியின் பேச்சுச் சேவையை அணுக முடியவில்லை. கேள்வியைத் தட்டச்சு செய்யலாம்.',
    'No speech was detected. Try again or type your question.': 'பேச்சு கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது தட்டச்சு செய்யவும்.',
    'The browser speech service does not support this language. Choose English or type your question.': 'உலாவியின் பேச்சுச் சேவை இந்த மொழியை ஆதரிக்கவில்லை. ஆங்கிலத்தைத் தேர்ந்தெடுக்கவும் அல்லது தட்டச்சு செய்யவும்.',
    'Voice input was stopped.': 'குரல் உள்ளீடு நிறுத்தப்பட்டது.', 'Voice input could not start. Check microphone access and try again.': 'குரல் உள்ளீட்டைத் தொடங்க முடியவில்லை. ஒலிவாங்கி அனுமதியைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'Start voice input': 'குரல் உள்ளீட்டைத் தொடங்கு', 'Stop voice recording': 'குரல் பதிவை நிறுத்து',
    'Clear selected chat': 'தேர்ந்த உரையாடலை நீக்கு', 'Local offline mode': 'உள்ளக இணையமற்ற பயன்முறை',
    'Your library is empty': 'உங்கள் நூலகம் காலியாக உள்ளது',
    'Upload a PDF, DOCX, or TXT file to begin.': 'தொடங்க PDF, DOCX அல்லது TXT கோப்பைப் பதிவேற்றவும்.',
    'DOCUMENT': 'ஆவணம்', 'SIZE': 'அளவு', 'FORMAT': 'வடிவம்', 'STATUS': 'நிலை', 'Error': 'பிழை', 'Remove': 'அகற்று',
    'Document removed.': 'ஆவணம் அகற்றப்பட்டது.',
    'The AI provider rate limit or available credit was reached. Try again later or check provider usage.': 'AI சேவையின் கோரிக்கை வரம்பு அல்லது கிடைக்கும் கிரெடிட் முடிந்துவிட்டது. பின்னர் முயற்சிக்கவும் அல்லது சேவை பயன்பாட்டைச் சரிபார்க்கவும்.',
    'Could not reach the AI provider. Check the service URL and try again.': 'AI சேவையை அணுக முடியவில்லை. சேவை முகவரியைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'The AI provider returned an unexpected chat response.': 'AI சேவையிலிருந்து எதிர்பாராத பதில் வந்தது.',
    'The AI provider returned an empty answer.': 'AI சேவை வெற்றுப் பதிலை அளித்தது.',
    'The AI provider rejected its API key. Check the token and its Inference Providers permission.': 'AI சேவை API திறவுகோலை நிராகரித்தது. திறவுகோலையும் அதன் Inference Providers அனுமதியையும் சரிபார்க்கவும்.',
    'The AI provider denied this request. Check token permissions and model access.': 'AI சேவை இந்தக் கோரிக்கையை மறுத்தது. திறவுகோல் அனுமதிகளையும் மாதிரி அணுகலையும் சரிபார்க்கவும்.',
    'The AI provider could not find this model or endpoint. Check the model ID and provider suffix.': 'AI சேவையில் இந்த மாதிரி அல்லது முகவரி இல்லை. மாதிரி ID மற்றும் சேவைப் பின்னொட்டைக் சரிபார்க்கவும்.',
    'Chat model: configured.': 'அரட்டை மாதிரி: அமைக்கப்பட்டுள்ளது.',
    'Chat model: URL and model are set, but its API key is missing.': 'அரட்டை மாதிரி: முகவரியும் மாதிரியும் உள்ளன; API திறவுகோல் இல்லை.',
    'Chat model: not configured; offline evidence mode is active.': 'அரட்டை மாதிரி: அமைக்கப்படவில்லை; இணையமற்ற ஆதாரப் பயன்முறை செயல்படுகிறது.',
    'Embeddings: local feature-hash fallback; cross-language semantic matching may be limited.': 'எம்பெட்டிங்குகள்: உள்ளக மாற்று முறை; மொழிகளுக்கிடையேயான பொருள் பொருத்தம் குறைவாக இருக்கலாம்.',
    'OCR: local Tesseract (Tamil + English).': 'OCR: உள்ளக Tesseract (தமிழ் + ஆங்கிலம்).',
    'OCR: remote provider configured.': 'OCR: தொலைநிலைச் சேவை அமைக்கப்பட்டுள்ளது.',
    'OCR: Tesseract not found; scanned PDFs need OCR setup.': 'OCR: Tesseract இல்லை; ஸ்கேன் செய்யப்பட்ட PDF-களுக்கு OCR அமைப்பு தேவை.'
  };

  let language = localStorage.getItem('mozhiai-language') === 'ta' ? 'ta' : 'en';
  const textSource = new WeakMap();
  const attributeSource = new WeakMap();
  let writingTranslation = false;

  function translatedText(source) {
    const trimmed = source.trim();
    if (!trimmed) return source;
    let dynamic = trimmed.match(/^of (\d+)$/i);
    if (dynamic) return `${dynamic[1]} பக்கங்களில்`;
    dynamic = trimmed.match(/^(\d+) pages?$/i);
    if (dynamic) return `${dynamic[1]} பக்கங்கள்`;
    dynamic = trimmed.match(/^(\d+) documents?$/i);
    if (dynamic) return `${dynamic[1]} ஆவணங்கள்`;
    dynamic = trimmed.match(/^(\d+) KB · (\d+) pages?$/i);
    if (dynamic) return `${dynamic[1]} KB · ${dynamic[2]} பக்கங்கள்`;
    dynamic = trimmed.match(/^· Page (\d+)$/i);
    if (dynamic) return `· பக்கம் ${dynamic[1]}`;
    dynamic = trimmed.match(/^· Page unavailable$/i);
    if (dynamic) return '· பக்கத் தகவல் இல்லை';
    dynamic = trimmed.match(/^Open (.+)$/i);
    if (dynamic) return `திற: ${dynamic[1]}`;
    dynamic = trimmed.match(/^Remove “(.+)” and its local indexed data\? This cannot be undone\.$/i);
    if (dynamic) return `“${dynamic[1]}” ஆவணத்தையும் அதன் உள்ளகக் குறியீட்டுத் தரவையும் அகற்றவா? இதை மாற்ற முடியாது.`;
    dynamic = trimmed.match(/^Database: (.+)\. Vector search: (.+)\. (.+)$/i);
    if (dynamic) return `${translatedText(`Database: ${dynamic[1]}.`)} ${translatedText(`Vector search: ${dynamic[2]}.`)} ${translatedText(dynamic[3])}`;
    dynamic = trimmed.match(/^Database: (.+)\.$/i);
    if (dynamic) return `தரவுத்தளம்: ${dynamic[1]}.`;
    dynamic = trimmed.match(/^Vector search: (.+)\.$/i);
    if (dynamic) return `வெக்டர் தேடல்: ${dynamic[1]}.`;
    dynamic = trimmed.match(/^Embeddings: (.+) provider\.$/i);
    if (dynamic) return `எம்பெட்டிங்குகள்: ${dynamic[1]} சேவை.`;
    dynamic = trimmed.match(/^Embeddings: (.+) is set, but its key is missing\.$/i);
    if (dynamic) return `எம்பெட்டிங்குகள்: ${dynamic[1]} அமைக்கப்பட்டுள்ளது; ஆனால் திறவுகோல் இல்லை.`;
    dynamic = trimmed.match(/^I couldn’t complete (summary|explain|translate)\. (.+)$/i);
    if (dynamic) return `${translatedText(dynamic[1][0].toUpperCase() + dynamic[1].slice(1))} செயலை முடிக்க முடியவில்லை. ${translatedText(dynamic[2])}`;
    dynamic = trimmed.match(/^(\d+) matching passages? · local hybrid ranking$/i);
    if (dynamic) return `${dynamic[1]} பொருந்தும் பகுதிகள் · உள்ளகக் கலப்பு தரவரிசை`;
    dynamic = trimmed.match(/^(\d+) document(s)? ready(?: · (\d+) need attention)?(?: · Some unsupported files were skipped)?\.$/i);
    if (dynamic) return `${dynamic[1]} ஆவணம் தயார்${dynamic[3] ? ` · ${dynamic[3]} ஆவணங்களுக்கு கவனம் தேவை` : ''}.`;
    dynamic = trimmed.match(/^I couldn’t complete that request: (.+)$/i);
    if (dynamic) return `இந்தக் கோரிக்கையை முடிக்க முடியவில்லை: ${translatedText(dynamic[1])}`;
    const translated = translations[trimmed];
    if (!translated) return source;
    const start = source.indexOf(trimmed);
    return source.slice(0, start) + translated + source.slice(start + trimmed.length);
  }

  function visit(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('.message-content, .file-meta strong, .library-name strong, .selected-pill, .history-item, .citation-chip')) return;
      const current = node.nodeValue || '';
      const remembered = textSource.get(node);
      const source = remembered === undefined || (current !== remembered && current !== translatedText(remembered)) ? current : remembered;
      textSource.set(node, source);
      const next = language === 'ta' ? translatedText(source) : source;
      if (current !== next) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const attrs = ['placeholder', 'title', 'aria-label', 'aria-description'];
    let originals = attributeSource.get(node);
    if (!originals) { originals = new Map(); attributeSource.set(node, originals); }
    for (const attr of attrs) {
      if (!node.hasAttribute(attr)) continue;
      const current = node.getAttribute(attr);
      const remembered = originals.get(attr);
      const source = remembered === undefined || (current !== remembered && current !== translatedText(remembered)) ? current : remembered;
      originals.set(attr, source);
      const next = language === 'ta' ? translatedText(source) : source;
      if (current !== next) node.setAttribute(attr, next);
    }
    for (const child of node.childNodes) visit(child);
  }

  function apply() {
    const root = document.body;
    if (!root) return;
    writingTranslation = true;
    document.documentElement.lang = language === 'ta' ? 'ta' : 'en';
    visit(root);
    const button = document.getElementById('languageToggle');
    if (button) {
      const label = document.getElementById('languageToggleLabel');
      if (label) label.textContent = language === 'en' ? 'தமிழ்' : 'English';
      button.setAttribute('aria-label', language === 'en' ? 'Switch interface language to Tamil' : 'மொழியை ஆங்கிலத்திற்கு மாற்று');
      button.title = language === 'en' ? 'Switch the whole interface to Tamil' : 'Switch the whole interface to English';
      button.setAttribute('aria-pressed', String(language === 'ta'));
    }
    const englishVoiceOption = document.querySelector('#voiceLanguage option[value="en-IN"]');
    if (englishVoiceOption) englishVoiceOption.textContent = language === 'ta' ? 'ஆங்கிலம்' : 'English';
    document.title = language === 'ta' ? 'MOZHIAI — தமிழ் மொழி நுண்ணறிவு' : 'MOZHIAI — Tamil language intelligence';
    writingTranslation = false;
  }

  window.mozhiI18n = {
    get language() { return language; },
    t(value) { return language === 'ta' ? translatedText(String(value)) : String(value); },
    apply,
    toggle() {
      language = language === 'en' ? 'ta' : 'en';
      localStorage.setItem('mozhiai-language', language);
      apply();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('languageToggle')?.addEventListener('click', () => window.mozhiI18n.toggle());
    apply();
    const observer = new MutationObserver(records => {
      if (writingTranslation) return;
      writingTranslation = true;
      for (const record of records) {
        if (record.type === 'characterData') visit(record.target);
        else record.addedNodes.forEach(visit);
      }
      writingTranslation = false;
    });
    observer.observe(document.body, {subtree: true, childList: true, characterData: true});
  });
})();
