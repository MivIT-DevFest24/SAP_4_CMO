from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# WebSocket endpoint to handle incoming WebSocket connections.

# This endpoint accepts WebSocket connections at the "/ws" route. Once a connection is established,
# it continuously listens for incoming text data from the client. Received data is logged for
# monitoring purposes. If the WebSocket connection is closed, a log entry is created to indicate
# the disconnection.

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            logging.info(f"Received data from ingestion service: {data}")
    except WebSocketDisconnect:
        logging.info("WebSocket connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
