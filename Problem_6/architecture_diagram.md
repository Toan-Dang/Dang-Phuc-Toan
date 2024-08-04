
# Architecture Diagram for Real-Time Scoreboard API Service

This section illustrates the architecture diagram for the Real-Time Scoreboard API Service.

## Architecture Diagram

```mermaid
graph TD;
    User --> Web_Browser;
    Web_Browser --> API_Gateway;
    API_Gateway --> Cognito;
    API_Gateway --> Lambda_Update_Score;
    Lambda_Update_Score --> DynamoDB;
    API_Gateway --> WebSocket_Client;
    WebSocket_Client --> Live_Scoreboard;
    Lambda_Update_Score --> CloudWatch;
    DynamoDB --> WAF;

    classDef default fill:#ffebcd,stroke:#333,stroke-width:2px;
    class User,Web_Browser,API_Gateway,Lambda_Update_Score,Cognito,DynamoDB,CloudWatch,WAF,WebSocket_Client,Live_Scoreboard default;
    
    User(User) 
    Web_Browser(Web Browser) 
    API_Gateway(AWS API Gateway
(HTTP & WebSocket))
    Lambda_Update_Score(AWS Lambda
(Update Score))
    Cognito(AWS Cognito
(Authentication))
    DynamoDB(AWS DynamoDB
(UserScores Table))
    CloudWatch(AWS CloudWatch
(Monitoring & Logs))
    WAF(AWS WAF
(Security))
    WebSocket_Client(WebSocket
(Client))
    Live_Scoreboard(Live Scoreboard
(Frontend))
```

## Elements

| Element                          | Description                                        |
|----------------------------------|----------------------------------------------------|
| User                             | End user interacting with the system               |
| Web Browser                      | The browser used by the user                       |
| AWS API Gateway (HTTP & WebSocket)| Handles HTTP and WebSocket requests                |
| AWS Lambda (Update Score)        | Lambda function to update scores                   |
| AWS Cognito (Authentication)     | Handles user authentication and authorization      |
| AWS DynamoDB (UserScores Table)  | Database table to store user scores                |
| AWS CloudWatch (Monitoring & Logs)| Monitoring and logging service                     |
| AWS WAF (Security)               | Web Application Firewall for security              |
| WebSocket (Client)               | WebSocket client for real-time updates             |
| Live Scoreboard (Frontend)       | Frontend display of the live scoreboard            |

## Connections

| Start Element                                     | End Element                          |
|--------------------------------------------------|--------------------------------------|
| User                                             | Web Browser                          |
| Web Browser                                      | AWS API Gateway (HTTP & WebSocket)   |
| AWS API Gateway (HTTP & WebSocket)               | AWS Cognito (Authentication)         |
| AWS API Gateway (HTTP & WebSocket)               | AWS Lambda (Update Score)            |
| AWS Lambda (Update Score)                        | AWS DynamoDB (UserScores Table)      |
| AWS API Gateway (HTTP & WebSocket)               | WebSocket (Client)                   |
| WebSocket (Client)                               | Live Scoreboard (Frontend)           |
| AWS Lambda (Update Score)                        | AWS CloudWatch (Monitoring & Logs)   |
| AWS DynamoDB (UserScores Table)                  | AWS WAF (Security)                   |
```
