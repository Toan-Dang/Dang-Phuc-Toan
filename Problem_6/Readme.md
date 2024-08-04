
# Real-Time Scoreboard API Service

This documentation provides the specification for the Real-Time Scoreboard API Service. The service is responsible for updating user scores in real-time, ensuring secure API transactions, and preventing unauthorized score manipulations.

## Overview

The Real-Time Scoreboard API Service is built using AWS services to handle the backend operations, including updating scores, real-time notifications, and security. This service includes endpoints for score updates and a WebSocket for real-time communication.

## Features

1. **Live Scoreboard Updates**: Real-time updates of the top 10 user scores.
2. **Secure Score Updates**: Authentication and authorization using AWS Cognito.
3. **API for Score Updates**: Secure endpoint to update user scores.
4. **Prevent Unauthorized Access**: Security measures to prevent unauthorized score increments.

## Architecture Diagram

![Execution Flow Diagram](diagram.png)

## API Endpoints

### 1. Update Score Endpoint

**Endpoint**: `/update-score`

**Method**: `POST`

**Request Headers**:
- `Authorization`: Bearer token obtained from AWS Cognito.

**Request Body**:
```json
{
    "userId": "string",
    "scoreIncrement": "integer"
}
```

**Response**:
- **200 OK**: Score updated successfully.
```json
{
    "message": "Score updated",
    "score": "integer"
}
```
- **401 Unauthorized**: Unauthorized access.
- **500 Internal Server Error**: Error updating score.

### 2. WebSocket for Real-Time Updates

**Endpoint**: `wss://your-api-gateway-endpoint`

**Events**:
- `score-update`: Broadcasted when a user's score is updated.
    ```json
    {
        "userId": "string",
        "newScore": "integer"
    }
    ```

## AWS Services Used

1. **Amazon RDS / DynamoDB**: For storing user scores.
2. **AWS Lambda**: For handling backend logic and API endpoints.
3. **Amazon API Gateway**: For exposing the HTTP and WebSocket endpoints.
4. **AWS Cognito**: For user authentication and authorization.
5. **AWS WAF**: For protecting the API endpoints.
6. **AWS CloudWatch**: For logging and monitoring.

## Setup Instructions

1. **Database Setup**:
    - Create a DynamoDB table named `UserScores` with `userId` as the primary key.

2. **Lambda Functions**:
    - Create a Lambda function for handling score updates.
    - Create another Lambda function for managing WebSocket connections.

3. **API Gateway Configuration**:
    - Set up HTTP endpoints for the Lambda functions.
    - Set up WebSocket API for real-time updates.

4. **AWS Cognito**:
    - Set up a Cognito User Pool for user authentication.

5. **AWS WAF**:
    - Configure WAF rules to protect the API endpoints.

6. **CloudWatch Monitoring**:
    - Set up CloudWatch for logging and monitoring.
    - Create alarms for suspicious activities.

## Security Considerations

- **Authentication and Authorization**: Ensure that all API requests are authenticated using AWS Cognito.
- **Input Validation**: Sanitize and validate all inputs to prevent injection attacks.
- **Rate Limiting**: Implement rate limiting using AWS API Gateway to prevent abuse.
- **Monitoring**: Use CloudWatch for real-time monitoring and logging of all activities.

## Additional Comments for Improvement

1. **Data Caching**: Implement caching strategies using AWS ElastiCache to improve read performance for the scoreboard.
2. **Automated Testing**: Set up automated tests for the Lambda functions to ensure robustness.
3. **Scalability**: Consider using AWS Auto Scaling for the Lambda functions to handle varying loads.
4. **Error Handling**: Improve error handling and provide more detailed error messages.
5. **Audit Logging**: Implement detailed audit logging for all score update transactions to enhance security and traceability.
