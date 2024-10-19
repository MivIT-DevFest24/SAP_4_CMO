from fastapi import FastAPI, Request
import logging
import httpx

logging.basicConfig(level=logging.INFO)

app = FastAPI()

ANALYTICS_URL = "http://localhost:8001/process-data/"

@app.post("/receive-data/")  # Callback for receiving data
async def receive_data(request: Request):
    data = await request.json()  # Parse incoming data
    logging.info(f"Received data: {data}")
    
    # Send data to Analytics Service
    async with httpx.AsyncClient() as client:
        response = await client.post(ANALYTICS_URL, json=data)
        logging.info(f"Data forwarded to Analytics service. Response status: {response.status_code}")
    
    return {"status": "Data received and forwarded"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
