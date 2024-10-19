# Base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app


# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the current directory (your code) into the container
COPY . .