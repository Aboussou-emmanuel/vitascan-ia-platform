import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url=os.getenv("GROQ_BASE_URL")
)

class Message(BaseModel):
    role: str
    content: str

class ChatSession(BaseModel):
    history: List[Message]

@app.post("/chat")
async def chat(session: ChatSession):
    # Prompt de secours pour forcer la structure
    system_prompt = (
        "Tu es un assistant médical. Réponds EXCLUSIVEMENT en JSON. "
        "Après 5 questions, tu DOIS fournir l'analyse finale. "
        "Structure : {\"is_final\": false, \"message\": \"...\"} "
        "OU {\"is_final\": true, \"message\": \"Terminé\", \"analysis\": {\"urgency_level\": \"low\", \"probabilities\": [{\"condition\": \"Exemple\", \"score\": 90}], \"prevention\": [\"Repos\"]}}"
    )
    
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "system", "content": system_prompt}] + [m.model_dump() for m in session.history],
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        return result
        
    except Exception as e:
        print(f"Erreur Serveur: {e}")
        # En cas de bug, on renvoie une réponse JSON valide pour éviter le crash Frontend
        return {"is_final": False, "message": "Je traite vos informations. Pouvez-vous préciser vos antécédents ?"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)