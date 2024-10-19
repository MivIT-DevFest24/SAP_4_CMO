import requests
import logging

# Define the list of machine IDs (expand as needed)
machines = [
    "welding_robot_006",
    "stamping_press_001",
    "painting_robot_002",
    "agv_003",
    "cnc_milling_004",
    "leak_test_005"
]

# Base URL of the API to subscribe to
api_url = "https://manufcaturing-challenge-production.up.railway.app/Webhook"

# Your public-facing service (use ngrok or a public URL)
callback_url = "https://e5a2-154-248-212-97.ngrok-free.app/receive-data/"

def subscribe_to_machines():
    for machine in machines:
        subscription_payload = {
            "machine": machine,
            "callback_url": callback_url
        }
        try:
            response = requests.post(api_url, json=subscription_payload)
            if response.status_code == 200:
                logging.info(f"Subscribed successfully to {machine}")
            else:
                logging.error(f"Failed to subscribe to {machine}: {response.status_code}, {response.text}")
        except Exception as e:
            logging.error(f"Error subscribing to {machine}: {e}")

# Subscribe to all machines on startup
if __name__ == "__main__":
    subscribe_to_machines()
