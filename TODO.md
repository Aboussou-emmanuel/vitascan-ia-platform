# TODO: Fix Health AI Platform for Functional Site

## Backend Fixes
- [ ] Fix backend/main.py: Add missing imports (FastAPI, CORSMiddleware, HTTPException, json), use config for model and API key, correct Groq model.
- [ ] Create backend/core/config.py: Load env vars for MODEL_NAME and GROQ_API_KEY.
- [ ] Implement backend/services/ai_engine.py: Handle the chat completion logic.
- [ ] Update backend/requirements.txt: Add pydantic.

## Frontend Fixes
- [ ] Check frontend/lib/api.ts: Ensure base URL points to backend (localhost:8000).

## Testing
- [ ] Run backend server.
- [ ] Run frontend server.
- [ ] Verify functionality.
