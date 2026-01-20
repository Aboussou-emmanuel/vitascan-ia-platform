from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    role: str
    content: str

class ChatSession(BaseModel):
    history: List[Message]

class Condition(BaseModel):
    condition: str
    score: int
    urgency: str

class Analysis(BaseModel):
    urgency_level: str
    probabilities: List[Condition]
    prevention: List[str]

class AIResponse(BaseModel):
    is_final: bool
    message: str
    analysis: Optional[Analysis] = None