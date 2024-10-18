import requests

api_url = "https://manufcaturing-challenge-production.up.railway.app/Webhook"

ngrok = "https://f5d5-5-195-234-187.ngrok-free.app"

subscription_payload = {
    "machine": "painting_robot_002",  # machine ID (depends)
    "callback_url": f"{ngrok}/receive-data/"  # localhost
}

response = requests.post(api_url, json=subscription_payload) # Subscribe to the webhook

# Print the response to verify subscription
print(f"Subscription response: {response.status_code}, {response.text}")
