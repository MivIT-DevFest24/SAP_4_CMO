# Base image
FROM python:3.9-slim

# Set working directory inside the container
WORKDIR /app


# Copy the requirements file
COPY requirements.txt .


# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Command to start the subscription and then run the FastAPI app
CMD python subscription_manager.py && uvicorn webhook_receive:app --host 0.0.0.0 --port 8000
