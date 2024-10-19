import requests

api_url = "https://manufcaturing-challenge-production.up.railway.app/Webhook"

ngrok = "https://f5d5-5-195-234-187.ngrok-free.app"

machines = ["agv_003", "painting_robot_002", "cnc_milling_004", "leak_test_005", "stamping_press_001"]

subscription_payload = {
    "machine": machines[0],  # machine ID (depends)
    "callback_url": f"{ngrok}/receive-data/"  # localhost
}

response = requests.post(api_url, json=subscription_payload) # Subscribe to the webhook

# Print the response to verify subscription
print(f"Subscription response: {response.status_code}, {response.text}")
