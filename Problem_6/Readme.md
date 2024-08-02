# Scoreboard API Module

## Overview

This module is responsible for managing the scoreboard for our website, which displays the top 10 users' scores. The module ensures live updates to the scoreboard and prevents unauthorized score manipulation.

## Features

- Display the top 10 users' scores on the scoreboard.
- Provide real-time updates to the scoreboard.
- Allow users to perform actions that increase their scores.
- Secure the score updating process to prevent unauthorized access.

## API Endpoints

### 1. Get Top 10 Scores

**Endpoint:** `/api/scores/top10`

**Method:** GET

**Description:** Fetches the top 10 users' scores.

**Response:**

```json
{
  "status": "success",
  "data": [
    { "userId": "user1", "score": 100 },
    { "userId": "user2", "score": 95 },
    ...
  ]
}
