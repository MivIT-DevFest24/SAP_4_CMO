from fastapi import FastAPI, Request
import logging
import httpx
import pandas as pd
import os
from langchain.output_parsers.json import SimpleJsonOutputParser
import google.generativeai as genai
from dotenv import load_dotenv

from analyse import analyse

logging.basicConfig(level=logging.INFO)

app = FastAPI()

ALERTS_URL = "http://localhost:8002/alert-data/"

data_df = pd.DataFrame()

@app.post("/process-data/")
async def process_data(request: Request):
    global data_df
    data = await request.json()  # Parse incoming data
    logging.info(f"Received data for analysis: {data}")
    
    # df
    new_data = pd.DataFrame([data])
    data_df = pd.concat([data_df, new_data], ignore_index=True)
    
    logging.info(f"Data stored for analysis. Current data count: {len(data_df)} rows")

    load_dotenv()

    # LLM = GIMINI 1.5
    GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # JSON Parser
    json_parser = SimpleJsonOutputParser()

    analysis_result = analyse(data, json_parser, model)
    logging.info(f"Analysis result: {analysis_result}")

    # Send data to Analytics Service
    async with httpx.AsyncClient() as client:
        response = await client.post(ALERTS_URL, json=analysis_result) if analysis_result["action"] == "alert" else None
        logging.info(f"Data forwarded to Analytics service. Response status: {response.status_code}")

    return {"status": "Data processed successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
