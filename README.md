# Smart Analytics Platform for Car Manufacturing Operations

This platform is a **Smart Analytics Platform** for monitoring and analyzing real-time machine data from car manufacturing operations. It collects data from various machines, processes it using an AI-driven analytics service, and stores the data in a time-series database. The platform also supports user authentication and management, allowing users to log in and access personalized insights.

## Table of Contents

- Introduction
- Features
- Technologies Used
- Project Architecture
- Services
  - Data Ingestion Service
  - Analytics Service
  - InfluxDB
  - User Management
- How to Run
- API Endpoints
- Charts and Visualization
- Contributing

## Introduction

This platform enables real-time monitoring and smart analysis of machines in car manufacturing operations, providing insights into performance, energy efficiency, and potential faults. It processes incoming sensor data, performs machine learning-based analysis, and uses a time-series database for historical tracking and predictive alerts.

## Features

- **Real-time monitoring**: Receive real-time machine data such as temperature, pressure, and speed.
- **Anomaly detection and prediction**: The Analytics service includes an LLM agent that detects anomalies and predicts future ones using both WebSocket and historical data from InfluxDB.
- **User Management**: Authentication and session management using Express.js with tokens and sessions.
- **Alerts**: Automated alerts based on anomaly detection and predictions.
- **Data persistence**: Store machine data in InfluxDB for historical analysis and dashboard visualization.
- **Containerized services**: Each service is deployed in an isolated Docker container.
- **Dashboard visualization**: Visualize real-time and historical sensor data through charts on the frontend.

## Technologies Used

- **FastAPI**: Backend API and WebSocket server for data ingestion and analytics.
- **InfluxDB**: Time-series database for storing machine data.
- **Docker & Docker Compose**: Containerization and orchestration of the services.
- **WebSockets**: Real-time communication between the Data Ingestion and Analytics services.
- **React (with Chart.js)**: Frontend for displaying charts and visualizing data.
- **Express.js**: User management with authentication and session handling.
- **Machine Learning**: LLM-based anomaly detection and future prediction agent for real-time and historical data analysis.

## Project Architecture

The project is structured as follows:

1. **Client**: The React-based frontend that renders visualizations and supports user login.
2. **Services**: A collection of backend services for different functionalities:
    - **Data Ingestion**: Receives machine data and forwards it for analysis.
    - **Analytics**: An LLM agent processes real-time and historical data for anomaly detection and predictions.
    - **User Management**: Handles user authentication, sessions, and tokens via Express.js.
    - **InfluxDB**: Stores and queries machine data.

## Services

### Data Ingestion Service

- **Purpose**: Receives machine data from external APIs and forwards it to the analytics service via WebSocket. It also stores data in InfluxDB for historical tracking.
- **Tech**: FastAPI, WebSocket, InfluxDBClient.

### Analytics Service

- **Purpose**: Analyzes incoming machine data in real-time and performs anomaly detection. An LLM agent predicts future anomalies using both the real-time data from WebSockets and historical data from the time-series database (InfluxDB). This service also sends alerts based on detected anomalies.
- **Tech**: FastAPI, WebSocket, InfluxDBClient, LLM agent.

### User Management

- **Purpose**: Manages user authentication, sessions, and tokens. Users can log in and access their data, add new users, and more.
- **Tech**: Express.js, JSON Web Tokens (JWT), Session Management.

### InfluxDB

- **Purpose**: Time-series database used to store the sensor data for historical tracking and analytics.
- **Setup**: Runs in a Docker container, pre-configured with an organization, bucket, and token.

```yaml
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
