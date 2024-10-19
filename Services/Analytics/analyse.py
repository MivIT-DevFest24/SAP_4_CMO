import logging
import os
from langchain.output_parsers.json import SimpleJsonOutputParser
import google.generativeai as genai
from dotenv import load_dotenv
import json

def analyse(input_data, json_parser, model):

    prompt = f"""

        # Task Overview
        # You are a Machine Performance Analyst. Your role is to review the data from a manufacturing machine and detect potential issues or schedule predictive maintenance. Based on the issue detected, provide a step-by-step guidance for resolving the issue. Finally, decide whether the issue warrants an immediate alert or maintenance scheduling.

        # Instructions:
        1. **Data Analysis**: 
            - Review the data provided by the machine and detect any anomalies or issues (such as overheating, unusual vibrations, or excessive energy consumption). Also, check if the machine requires predictive maintenance based on operational patterns or usage.

        2. **Recommendation Assignment**: 
            - Based on the detected issue, provide a step-by-step guide to resolving the issue. Here are some common actions for detected issues:
                - **Overheating**: Recommend steps such as reducing load, inspecting the cooling system, and verifying heat dissipation.
                - **Excessive Vibrations**: Suggest steps such as checking mechanical alignment, inspecting moving parts for wear, and tightening loose components.
                - **High Energy Consumption**: Advise steps such as optimizing machine settings, inspecting power-related components, and reducing unnecessary load.
                - **Predictive Maintenance**: Recommend scheduling maintenance based on wear-and-tear analysis or usage data, even if no immediate issue is detected.
                - **Normal Operation**: Confirm that the machine is operating within normal parameters and no action is required.

        3. **Action Decision**: 
            - Based on the severity of the detected issue or maintenance need, decide whether an immediate alert or maintenance scheduling is required. If the issue is critical or poses a significant risk to machine performance, the action should be "alert". If maintenance is required soon, the action should be "schedule_maintenance". Otherwise, the action should be "no_alert".

        4. **JSON Response**: 
            - Output the results in a JSON object with three keys: `"issue_detected"`, `"suggested_action"`, and `"action"`. 
            - The values should be the detected issue, the corresponding step-by-step suggested action, and either "alert", "schedule_maintenance", or "no_alert" based on the severity of the issue.

        # Your Task:
        # 1. Analyze the machine data and detect potential issues or maintenance requirements.
        # 2. Provide a step-by-step guide to resolving the issue or performing maintenance.
        # 3. Decide whether the issue requires an alert or maintenance scheduling.
        # 4. Return the result strictly in the following JSON format.

        Machine Data:
        {input_data}

        # Expected Output in JSON format:
        {{
            "issue_detected": "Detected Issue",
            "suggested_action": "Step-by-step guidance",
            "action": "alert or schedule_maintenance or no_alert"
        }}

        # Now, analyze the machine data and provide the JSON response.
    """

    response = model.generate_content(prompt)

    try:
        jsonified_response = json_parser.parse(response.text)
    except json.JSONDecodeError as e:
        logging.error(f"Failed to parse JSON response: {e}")
        jsonified_response = None  # Handle as needed


    return jsonified_response

if __name__ == "__main__":
    load_dotenv()

    input_data = {"machine_id": "welding_robot_006", 
                  "weld_temperature": 1500, 
                  "weld_current": 140, 
                  "weld_voltage": 32, 
                  "weld_time": 480, 
                  "pressure_applied": 950, 
                  "arm_position": {"x": 115.5, "y": 76.4, "z": 195.3}, 
                  "wire_feed_rate": 5, 
                  "gas_flow_rate": 18, 
                  "weld_strength_estimate": 1900, 
                  "vibration_level": 0.4, 
                  "power_consumption": 3.2, 
                  "timestamp": "2024-10-14T17:00:00Z"
                  }

    json_parser = SimpleJsonOutputParser()

    GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    result = analyse(input_data, json_parser, model)
    print(result)