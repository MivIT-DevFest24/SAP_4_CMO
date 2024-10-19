from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import logging
from analyse import analyse
from langchain.output_parsers.json import SimpleJsonOutputParser
import google.generativeai as genai
import os
from dotenv import load_dotenv

import websockets

load_dotenv()

# LLM = GIMINI 1.5
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# JSON Parser
json_parser = SimpleJsonOutputParser()

logging.basicConfig(level=logging.INFO)

app = FastAPI()

alerts_ws_url = "ws://alerts-service:8002/ws"

# WebSocket endpoint to handle incoming WebSocket connections.

# This endpoint accepts WebSocket connections at the "/ws" route. Once a connection is established,
# it continuously listens for incoming text data from the client. Received data is logged for
# monitoring purposes. If the WebSocket connection is closed, a log entry is created to indicate
# the disconnection.

async def send_to_alerts(data):
    """
    Asynchronously sends data to the analytics service via a WebSocket connection.

    Args:
        data (any): The data to be sent to the analytics service. It will be converted to a string before sending.

    Raises:
        Exception: If there is an error during the WebSocket connection or data transmission, it will be logged as an error.

    Logs:
        Info: Logs a message indicating that the data has been successfully sent to the analytics service.
        Error: Logs an error message if the data transmission fails.
    """
    try:
        async with websockets.connect(alerts_ws_url) as websocket:
            await websocket.send(data) if data['action'] == "alert" else None
            logging.info(f"Data sent to analytics service: {data}")
    except Exception as e:
        logging.error(f"Failed to send data to analytics service: {e}")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            logging.info(f"Received data from ingestion service: {data}")
            analysis_result = analyse(data, json_parser, model)
            logging.info(f"Analysis result: {analysis_result}")
            await send_to_alerts(data)

    except WebSocketDisconnect:
        logging.info("WebSocket connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
