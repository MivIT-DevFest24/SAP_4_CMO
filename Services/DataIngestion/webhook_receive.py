from fastapi import FastAPI, Request
import logging
import httpx
import websockets

from influxdb_client import Point
from influxdb_conf import get_influxdb_client

import os
import dotenv

dotenv.load_dotenv()

# InfluxDB configuration
influx_bucket = os.getenv("INFLUX_BUCKET")
influx_org = os.getenv("INFLUX_ORG")

# FastAPI app instance
app = FastAPI()

analytics_ws_url = "ws://analytics-service:8001/ws"

# Initialize the InfluxDB client
client = get_influxdb_client()

write_api = client.write_api()


async def save_to_influxdb(data):
    """
    Asynchronously saves data to InfluxDB.
    This function takes a dictionary of data, constructs an InfluxDB Point object,
    and writes it to the specified InfluxDB bucket. The data dictionary should 
    contain a "machine_id" key for tagging, and a "timestamp" key for the point's 
    timestamp. All other key-value pairs in the dictionary are added as fields to 
    the InfluxDB point.
    Args:
        data (dict): A dictionary containing the data to be saved. The dictionary 
                     must include "machine_id" and "timestamp" keys. Other keys 
                     will be added as fields to the InfluxDB point.
    Raises:
        Exception: If there is an error writing the data to InfluxDB, an exception 
                   is logged.
    """
    try:
        # Create a Point object using the received data dynamically
        point = Point("sensor_data").tag("machine_id", data["machine_id"])

        # Dynamically add all fields to the InfluxDB point
        for key, value in data.items():
            if key != "machine_id" and key != "timestamp":
                if isinstance(value, str):
                    point.field(key, str(value))
                elif isinstance(value, int):
                    point.field(key, float(value))
                elif isinstance(value, dict):
                    for k, v in value.items():
                        point.field(f"{key}_{k}", float(v))
                else:
                    point.field(key, value)
        point.time(data["timestamp"])  # Use the timestamp provided in the data
        
        # Write the point to InfluxDB
        write_api.write(bucket=influx_bucket, org=influx_org, record=point)
        logging.info(f"Data written to InfluxDB: {data}")
    except Exception as e:
        logging.error(f"Failed to write data to InfluxDB: {e}")


async def send_to_analytics(data):
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
        async with websockets.connect(analytics_ws_url) as websocket:
            await websocket.send(str(data))  # Send the received data as a string
            logging.info(f"Data sent to analytics service: {data}")
    except Exception as e:
        logging.error(f"Failed to send data to analytics service: {e}")

# Route to receive data from machines
@app.post("/receive-data/")
async def receive_data(request: Request):
    # Parse the incoming JSON data
    data = await request.json()

    # Step 1: Save the data to InfluxDB
    await save_to_influxdb(data)

    # Step 2: Send the data to the analytics service
    await send_to_analytics(data)

    return {"status": "success", "message": "Data processed"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)