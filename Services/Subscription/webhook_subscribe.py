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
    """
    Subscribes a list of machines to a specified API endpoint using a POST request.

    This function iterates over a predefined list of machines, constructs a subscription payload
    for each machine, and sends a POST request to the API. It logs the success or failure of each
    subscription attempt.

    Raises:
        Exception: If there is an error during the subscription process.

    Logs:
        Info: When a machine is successfully subscribed.
        Error: When a machine fails to subscribe or if there is an exception during the process.
    """
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
