# Smart Analytics Platform for Car Manufacturing Operations

This project is a Smart Analytics Platform for monitoring and analyzing real-time machine data from car manufacturing operations. The platform collects data from various machines, processes it, and forwards it to an analytics service while saving it to a time-series database. The project is containerized using Docker for efficient deployment and management of services.

## Table of Contents

    Introduction
    Features
    Technologies Used
    Project Architecture
    Services
        Data Ingestion Service
        Analytics Service
        InfluxDB
    How to Run
    API Endpoints
    Charts and Visualization
    Contributing

## Introduction

This platform monitors real-time machine data from car manufacturing operations, providing insights into machine performance and energy efficiency. The system collects sensor data, forwards it to an analytics service for real-time processing, and stores the data in an InfluxDB database for historical tracking and analysis.
Features

    Real-time monitoring: Receive real-time machine data such as temperature, pressure, and speed.
    Analytics Service: Process and analyze incoming data in real-time using a WebSocket-based communication between services.
    Data persistence: Store machine data in InfluxDB for historical analysis and dashboard visualization.
    Containerized services: Each service is deployed in an isolated Docker container.
    Dashboard visualization: Charts are rendered in the frontend to display real-time and historical sensor data.

## Technologies Used

    FastAPI: Backend API and WebSocket server for data ingestion and analytics.
    InfluxDB: Time-series database for storing machine data.
    Docker & Docker Compose: Containerization and orchestration of the services.
    WebSockets: Real-time communication between the data ingestion and analytics service.
    React (with Chart.js): Frontend for displaying charts and visualizing data.
    Chart.js: Library used for creating charts and visualizations in the frontend.

## Project Architecture


/project-root
   ├── docker-compose.yml
   ├── Services
       ├── DataIngestion
           ├── webhook_receive.py  # Handles API and WebSocket communication
           ├── Dockerfile          # Docker setup for ingestion service
           ├── requirements.txt    # Dependencies for ingestion service
       ├── Analytics
           ├── analytics_receive.py  # WebSocket server for analytics
           ├── Dockerfile            # Docker setup for analytics service
           ├── requirements.txt      # Dependencies for analytics service
       ├── Frontend
           ├── public
           ├── src
               ├── ChartComponent.js  # React component for rendering charts
               ├── Dashboard.js       # Main dashboard for displaying sensor data
           ├── Dockerfile            # Docker setup for the frontend service

## Services
### Data Ingestion Service

    Purpose: Receives machine data from external APIs and forwards it to the analytics service via WebSocket. It also stores data in InfluxDB for historical tracking.
    Tech: FastAPI, WebSocket, InfluxDBClient.

Key File: webhook_receive.py

    Receives data from /receive-data/ endpoint.
    Sends data to the analytics service over WebSocket.
    Saves data to InfluxDB.

## InfluxDB

    Purpose: Time-series database used to store the sensor data for historical tracking and analytics.
    Setup: Runs in a Docker container, pre-configured with an organization, bucket, and token.

Docker configuration:

yaml

influxdb:
  image: influxdb:2.7
  ports:
    - "8086:8086"
  environment:
    DOCKER_INFLUXDB_INIT_MODE: setup
    DOCKER_INFLUXDB_INIT_USERNAME: admin
    DOCKER_INFLUXDB_INIT_PASSWORD: password
    DOCKER_INFLUXDB_INIT_ORG: MivIT
    DOCKER_INFLUXDB_INIT_BUCKET: SAP_4_CMO
    DOCKER_INFLUXDB_INIT_TOKEN: <YOUR_TOKEN>

## How to Run

    Clone the repository:

    bash

git clone https://github.com/your-repo/smart-analytics-platform.git
cd smart-analytics-platform

Start all services:

bash

docker-compose up --build

Access the services:

    Data Ingestion Service: http://localhost:8000
    Analytics Service (WebSocket): ws://localhost:8001/ws
    InfluxDB: http://localhost:8086 (for managing data, dashboards, and more).
