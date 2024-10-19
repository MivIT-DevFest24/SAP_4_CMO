from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import logging
import json

app = FastAPI()
logging.basicConfig(level=logging.INFO)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text() # receive
            logging.info(f"Received data from analytics service: {data}")

            # Process
            try:
                json_data = json.loads(data)
                issue_detected = json_data.get("issue_detected")
                suggested_action = json_data.get("suggested_action")
                action = json_data.get("action")

                logging.info(f"Issue Detected: {issue_detected}, 
                             Suggested Action: {suggested_action}, 
                             Action: {action}")

                await handle_alert(action, issue_detected, suggested_action) # handle it in frontend

            except json.JSONDecodeError:
                logging.error("Failed to decode the received JSON.")
                await websocket.send_text("Error: Invalid JSON format")

    except WebSocketDisconnect:
        logging.info("WebSocket connection closed")

async def handle_alert(action, issue_detected, suggested_action):

    if action == "alert":
        # Send alert to the frontend (display issue detected and suggested action)
        logging.info("Sending alert to the frontend.")
    
    elif action == "schedule_maintenance":
        # Send maintenance schedule to the frontend (display issue detected and suggested action)
        logging.info("Scheduling maintenance.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)