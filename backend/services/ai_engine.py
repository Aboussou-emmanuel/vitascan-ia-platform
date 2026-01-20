import json

async def process_chat(client, session, model_name):
    system_prompt = """Tu es un assistant médical. Pose 1 question à la fois.
    Au bout de 5 questions, fournis un diagnostic JSON final.
    Format attendu : {"is_final": bool, "message": "...", "analysis": {...}}"""

    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[{"role": "system", "content": system_prompt}] + [m.dict() for m in session.history],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        raise Exception(f"Error processing chat: {str(e)}")
