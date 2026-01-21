import json

async def process_chat(client, session, model_name):
    system_prompt = (
        "Tu es un assistant médical. Réponds EXCLUSIVEMENT en JSON. "
        "Après 5 questions, tu DOIS fournir l'analyse finale. "
        "Structure : {\"is_final\": false, \"message\": \"...\"} "
        "OU {\"is_final\": true, \"message\": \"Terminé\", \"analysis\": {\"urgency_level\": \"low\", \"probabilities\": [{\"condition\": \"Exemple\", \"score\": 90}], \"prevention\": [\"Repos\"]}}"
    )

    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[{"role": "system", "content": system_prompt}] + [m.model_dump() for m in session.history],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        raise Exception(f"Error processing chat: {str(e)}")
