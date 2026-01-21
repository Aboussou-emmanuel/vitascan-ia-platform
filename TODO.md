# TODO: Implement Fixes for Health AI Platform

## Backend Fixes
- [x] Update backend/core/config.py: Change MODEL_NAME to "llama-3.3-70b-versatile"
- [x] Update backend/services/ai_engine.py: Update system prompt to match main.py's detailed prompt, and change m.dict() to m.model_dump()
- [x] Update backend/main.py: Import from config, use config.MODEL_NAME and config.GROQ_API_KEY, and refactor to use ai_engine.process_chat instead of inline logic

## Testing
- [ ] Run backend server with uvicorn
- [ ] Run frontend server with npm run dev
- [ ] Test the chat functionality
