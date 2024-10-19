import json
import os
from influxdb_client import InfluxDBClient, Point, Dialect
from influxdb_client.client.write_api import SYNCHRONOUS
from dotenv import load_dotenv
from datetime import datetime, timedelta
import logging

# Load environment variables from .env file
load_dotenv()

# InfluxDB credentials and configuration
INFLUXDB_URL = os.getenv("INFLUXDB_URL")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET")

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize the InfluxDB Client
client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)

def query_data_past_5_days():
    """
    Queries the InfluxDB to fetch machine sensor data for the past 5 days, returning
    data points collected at 5-day intervals.
    """
    # Define the time window (past 5 days)
    current_time = datetime.utcnow()
    start_time = current_time - timedelta(days=5)
    
    # Define the Flux query to fetch data
    flux_query = f"""
    from(bucket: "{INFLUXDB_BUCKET}")
      |> range(start: {start_time.isoformat()}Z, stop: {current_time.isoformat()}Z)
      |> filter(fn: (r) => r._measurement == "sensor_data")
      |> filter(fn: (r) => r._field == "temperature" or r._field == "vibration_level" or r._field == "power_consumption")
      |> aggregateWindow(every: 5d, fn: mean, createEmpty: false)
      |> yield(name: "mean")
    """
    
    logging.info(f"Querying data from {start_time} to {current_time}")

    # Execute the query and get results
    query_api = client.query_api()
    result = query_api.query(flux_query)

    # Process the query result
    data_points = []
    for table in result:
        for record in table.records:
            data_points.append({
                "time": record.get_time(),
                "measurement": record.get_measurement(),
                "field": record.get_field(),
                "value": record.get_value()
            })

    return data_points

def predict(data_points, json_parser, model):
    
    prompt = """
    You are a predictive maintenance expert. Your task is to analyze time-series data from a machine's sensors over the past 5 days and determine whether the machine may require maintenance soon. The data includes fields like temperature, vibration level, and power consumption, among others, collected at regular intervals.

    ### Instructions:

    1. **Analyze the Data:**
    - Review the provided time-series data to detect any patterns, trends, or anomalies that may indicate wear, deterioration, or malfunction in the machine.
    - Look for indicators like:
        - **Increasing Temperature**: Steadily rising temperatures can suggest overheating issues.
        - **Higher Vibration Levels**: Abnormal vibration spikes could signal mechanical misalignment or loose components.
        - **Fluctuations in Power Consumption**: Inconsistent or higher-than-usual power consumption can point to electrical problems or inefficiency.
        - **Consistent or recurring patterns**: Identify any cyclic patterns in the data that could predict future problems.

    2. **Predictive Maintenance Decision**:
    - Based on your analysis, decide if the machine requires maintenance in the near future.
    - If no maintenance is required, return nothing.
    - If maintenance is predicted, return a JSON object with the machine ID and the reason for your prediction.

    3. **Output Format**:
    - **Return the following JSON** only if maintenance is needed:
        - `"machine"`: The machine's identifier.
        - `"reason"`: A brief explanation pointing out the specific data trends or patterns that led you to this conclusion.

    If no maintenance is required, do not return any output.

    ### Historical Data:
    {data_points}

    """

    formatted_prompt = prompt.format(data_points=data_points)

    response = model.generate_content(formatted_prompt)

    try:
        jsonified_response = json_parser.parse(response.text)
    except json.JSONDecodeError as e:
        logging.error(f"Failed to parse JSON response: {e}")
        jsonified_response = None

    return jsonified_response


if __name__ == "__main__":
    from langchain.output_parsers.json import SimpleJsonOutputParser
    import google.generativeai as genai

    # Initialize the Generative AI model
    GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Initialize the JSON parser
    json_parser = SimpleJsonOutputParser()

    # Query data from InfluxDB
    data_points = query_data_past_5_days()

    # Perform predictive maintenance analysis
    prediction = predict(data_points, json_parser, model)
    logging.info(f"Predictive Maintenance Prediction: {prediction}")
