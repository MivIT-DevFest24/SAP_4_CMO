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

        # Examples:
        # Example 1
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1600, "weld_current": 150, "weld_voltage": 30, "weld_time": 500, "pressure_applied": 1000, "arm_position": "x": 120.5, "y": 80.4, "z": 200.3, "wire_feed_rate": 5, "gas_flow_rate": 20, "weld_strength_estimate": 2000, "vibration_level": 0.2, "power_consumption": 3.5, "timestamp": "2024-10-14T11:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Normal Operation", "suggested_action": "No action required.", "action": "no_alert"}}

        # Example 2
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1800, "weld_current": 160, "weld_voltage": 35, "weld_time": 600, "pressure_applied": 1200, "arm_position": "x": 125.5, "y": 85.4, "z": 210.3, "wire_feed_rate": 6, "gas_flow_rate": 22, "weld_strength_estimate": 2500, "vibration_level": 0.6, "power_consumption": 4.8, "timestamp": "2024-10-14T12:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Overheating", "suggested_action": "Step 1: Reduce weld temperature. Step 2: Inspect cooling system. Step 3: Verify heat dissipation.", "action": "alert"}}

        # Example 3
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1400, "weld_current": 140, "weld_voltage": 28, "weld_time": 450, "pressure_applied": 900, "arm_position": "x": 110.5, "y": 75.4, "z": 190.3, "wire_feed_rate": 4, "gas_flow_rate": 18, "weld_strength_estimate": 1800, "vibration_level": 0.3, "power_consumption": 2.9, "timestamp": "2024-10-14T13:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Low Power Consumption", "suggested_action": "Step 1: Verify machine load. Step 2: Check for power supply issues.", "action": "no_alert"}}

        # Example 4
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1550, "weld_current": 148, "weld_voltage": 33, "weld_time": 520, "pressure_applied": 1100, "arm_position": "x": 118.5, "y": 78.4, "z": 198.3, "wire_feed_rate": 5.5, "gas_flow_rate": 19, "weld_strength_estimate": 2200, "vibration_level": 0.2, "power_consumption": 3.9, "timestamp": "2024-10-14T14:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Excessive Weld Current", "suggested_action": "Step 1: Reduce weld current. Step 2: Inspect weld quality.", "action": "alert"}}

        # Example 5
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1450, "weld_current": 135, "weld_voltage": 28, "weld_time": 400, "pressure_applied": 800, "arm_position": "x": 105.5, "y": 70.4, "z": 180.3, "wire_feed_rate": 4.2, "gas_flow_rate": 15, "weld_strength_estimate": 1700, "vibration_level": 0.1, "power_consumption": 3.0, "timestamp": "2024-10-14T15:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Predictive Maintenance Required", "suggested_action": "Step 1: Schedule maintenance. Step 2: Inspect mechanical components. Step 3: Perform routine diagnostics.", "action": "schedule_maintenance"}}

        # Example 6
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1700, "weld_current": 180, "weld_voltage": 40, "weld_time": 650, "pressure_applied": 1300, "arm_position": "x": 130.5, "y": 90.4, "z": 220.3, "wire_feed_rate": 7, "gas_flow_rate": 25, "weld_strength_estimate": 3000, "vibration_level": 0.8, "power_consumption": 5.2, "timestamp": "2024-10-14T16:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Overload Detected", "suggested_action": "Step 1: Reduce weld current and voltage. Step 2: Inspect components for wear.", "action": "alert"}}

        # Example 7
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1500, "weld_current": 140, "weld_voltage": 32, "weld_time": 480, "pressure_applied": 950, "arm_position": "x": 115.5, "y": 76.4, "z": 195.3, "wire_feed_rate": 5, "gas_flow_rate": 18, "weld_strength_estimate": 1900, "vibration_level": 0.4, "power_consumption": 3.2, "timestamp": "2024-10-14T17:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Vibration Detected", "suggested_action": "Step 1: Check mechanical alignment. Step 2: Inspect moving parts for wear. Step 3: Tighten loose components.", "action": "alert"}}

        # Example 8
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1600, "weld_current": 150, "weld_voltage": 30, "weld_time": 500, "pressure_applied": 1000, "arm_position": "x": 120.5, "y": 80.4, "z": 200.3, "wire_feed_rate": 5, "gas_flow_rate": 20, "weld_strength_estimate": 2000, "vibration_level": 0.0, "power_consumption": 3.5, "timestamp": "2024-10-14T18:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Normal Operation", "suggested_action": "No action required.", "action": "no_alert"}}

        # Example 9
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1900, "weld_current": 170, "weld_voltage": 38, "weld_time": 700, "pressure_applied": 1400, "arm_position": "x": 135.5, "y": 95.4, "z": 230.3, "wire_feed_rate": 8, "gas_flow_rate": 28, "weld_strength_estimate": 3200, "vibration_level": 1.0, "power_consumption": 6.0, "timestamp": "2024-10-14T19:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Severe Overheating", "suggested_action": "Step 1: Shut down machine. Step 2: Inspect cooling system immediately. Step 3: Reduce load before restarting.", "action": "alert"}}

        # Example 10
        # Input Data: "machine_id": "welding_robot_006", "weld_temperature": 1550, "weld_current": 145, "weld_voltage": 32, "weld_time": 510, "pressure_applied": 1050, "arm_position": "x": 118.0, "y": 79.4, "z": 202.3, "wire_feed_rate": 5.5, "gas_flow_rate": 21, "weld_strength_estimate": 2100, "vibration_level": 0.3, "power_consumption": 3.8, "timestamp": "2024-10-14T20:00:00Z"
        # Expected JSON Output: {{"issue_detected": "Normal Operation", "suggested_action": "No action required.", "action": "no_alert"}}

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

    jsonified_response = json_parser.parse(response.text)

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