def analyse(input_data, json_parser, model):

    prompt = """
        # Task Overview
        # You are a Machine Performance Analyst. Your role is to review the data from a manufacturing machine and detect potential issues. Based on the issue detected, provide a recommended action.

        # Instructions:
        1. **Data Analysis**: 
            - Review the data provided by the machine and detect any anomalies or issues (such as overheating, unusual vibrations, or excessive energy consumption).

        2. **Recommendation Assignment**: 
            - Based on the detected issue, provide a suitable action. Here are some common actions for detected issues:
                - **Overheating**: Recommend reducing load or inspecting the cooling system.
                - **Excessive Vibrations**: Suggest checking mechanical alignment or inspecting moving parts.
                - **High Energy Consumption**: Advise optimizing machine settings or inspecting power-related components.
                - **Normal Operation**: Confirm that the machine is operating within normal parameters.

        3. **JSON Response**: 
            - Output the results in a JSON object with two keys: `"issue_detected"` and `"recommended_action"`. The values should be the detected issue and the corresponding recommended action.

        # Examples:
        # Example 1
        # Input Data: {"temperature": 85, "vibration_level": 0.5, "power_consumption": 5.0}
        # Expected JSON Output: {{"issue_detected": "Overheating", "recommended_action": "Reduce load or inspect cooling system"}}

        # Example 2
        # Input Data: {"temperature": 45, "vibration_level": 0.2, "power_consumption": 2.0}
        # Expected JSON Output: {{"issue_detected": "Normal Operation", "recommended_action": "No action required"}}

        # Your Task:
        # 1. Analyze the machine data and detect potential issues.
        # 2. Provide the appropriate recommended action based on the issue.
        # 3. Return the result strictly in the following JSON format.

        Machine Data: {input_data}

        # Expected Output:
        {{
            "issue_detected": "Detected Issue",
            "recommended_action": "Suggested Action"
        }}

        # Now, analyze the machine data and provide the JSON response.
        """

    formatted_prompt = prompt.format(input_data=input_data)

    response = model.generate_content(formatted_prompt)

    jsonified_response = json_parser.parse(response.text)

    return jsonified_response
