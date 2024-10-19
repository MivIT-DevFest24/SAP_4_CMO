import os
from dotenv import load_dotenv
from influxdb_client import InfluxDBClient

# Load environment variables from .env file
load_dotenv()

# Get environment variables
influx_token = os.getenv("INFLUX_TOKEN")
influx_org = os.getenv("INFLUX_ORG")
influx_bucket = os.getenv("INFLUX_BUCKET")
influx_url = os.getenv("INFLUX_URL")

def get_influxdb_client():
    # Initialize the InfluxDB client
    client = InfluxDBClient(
        url=influx_url,
        token=influx_token,
        org=influx_org
    )
    return client


