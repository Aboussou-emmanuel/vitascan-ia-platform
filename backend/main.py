import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
from core.config import MODEL_NAME, GROQ_API_KEY
from services.ai_engine import process_chat

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url=os.getenv("GROQ_BASE_URL")
)

class Message(BaseModel):
    role: str
    content: str

class ChatSession(BaseModel):
    history: List[Message]

@app.post("/chat")
async def chat(session: ChatSession):
    try:
        return await process_chat(client, session, MODEL_NAME)
    except Exception as e:
        print(f"Erreur Serveur: {e}")
        # En cas de bug, on renvoie une réponse JSON valide pour éviter le crash Frontend
        return {"is_final": False, "message": "Je traite vos informations. Pouvez-vous préciser vos antécédents ?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)