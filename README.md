# HealthCheck AI 🏥

Système expert d'analyse de symptômes utilisant FastAPI et Next.js.

## Installation

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # ou venv\Scripts\activate
pip install -r requirements.txt
# Ajoutez votre OPENAI_API_KEY dans le fichier .env
python main.py