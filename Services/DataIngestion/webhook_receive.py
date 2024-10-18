from fastapi import FastAPI, Request
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.post("/receive-data/") # Callback
async def receive_data(request: Request):
    data = await request.json()  # Parse
    logging.info(f"Received data: {data}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
