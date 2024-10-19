# Base image
FROM python:3.9-slim

# Set working directory inside the container
WORKDIR /app


# Copy the requirements file
COPY requirements.txt .

# Install dependencies, including WebSocket support
RUN pip install --no-cache-dir -r requirements.txt



# Copy the rest of the application code
COPY . .

# Expose the port for WebSocket
EXPOSE 8001

# Command to run the WebSocket server
CMD ["uvicorn", "analytics_receive:app", "--host", "0.0.0.0", "--port", "8001"]
