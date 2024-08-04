
# Project Title

This project is a backend application built using Express.js and TypeScript, with a PostgreSQL database.
## Structure

- **config**: About service configurations used in the project.
- **entity**: Database mapping with TypeORM.
- **middleware**: For authentication, decoding token.
- **module**: Core code, each module contains controller, service, routers, and repository.
- **migration**: To migrate code to database and initialize database schema.
- **service**: Other services (e.g., JWT for encoding).
- **utils**: Other configurations.
- **Dockerfile**: To run the project with Docker.

## Steps to Run

1. **Clone the repository and navigate to the project directory:**

```bash
cd Problem_5
cd backend
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Configure the environment variables:**

   - Copy or rename `example.env` to `.env`
   - Update the `.env` file with your PostgreSQL connection details

4. **Run database migrations:**

```bash
npm run migrate
```

5. **Start the server:**

```bash
npm run dev   # for development
npm run start # for production
```

## API Endpoints

The domain for all API endpoints is `http://localhost:5001`.

### Authentication

1. **Login to get token:**

   - **Endpoint:** `/login`
   - **Method:** POST
   - **Request Body:**
     ```json
     {
       "username": "toandp",
       "password": "123"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": token
     }
     ```

2. **Register if not have account:**

   - **Endpoint:** `/create-account`
   - **Method:** POST
   - **Request Body:**
     ```json
     {
       "username": "toandp",
       "password": "123"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": {}
     }
     ```

### CRUD Operations

1. **Get all resources:**

   - **Endpoint:** `/resource`
   - **Method:** GET
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": [
         {
           "name": "test",
           "description": "hehe",
           "resource_id": 6,
           "created_at": "2024-08-04T06:09:19.623Z"
         },
         {
           "name": "test123",
           "description": "hehexcxzc",
           "resource_id": 7,
           "created_at": "2024-08-04T06:09:19.623Z"
         }
       ]
     }
     ```

2. **Get filtered resources:**

   - **Endpoint:** `/resource/filter/search`
   - **Example:** `/resource/filter/search?name=test`
   - **Method:** GET
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Params:**
     ```json
     {
       "name": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": [
         {
           "name": "test",
           "description": "hehe",
           "resource_id": 6,
           "created_at": "2024-08-04T06:09:19.623Z"
         }
       ]
     }
     ```

3. **Get resource details:**

   - **Endpoint:** `/resource/:id`
   - **Example:** `/resource/:id/6`
   - **Method:** GET
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": {
         "name": "test",
         "description": "hehe",
         "resource_id": 6,
         "created_at": "2024-08-04T06:09:19.623Z"
       }
     }
     ```

4. **Create a new resource:**

   - **Endpoint:** `/create-resource`
   - **Method:** POST
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Request Body:**
     ```json
     {
       "name": "resource_name",
       "description": ""
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": null
     }
     ```

5. **Update a resource:**

   - **Endpoint:** `/update-resource`
   - **Method:** PUT
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Request Body:**
     ```json
     {
       "id": 6,
       "name": "resource_name",
       "description": ""
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": null
     }
     ```

6. **Delete a resource:**

   - **Endpoint:** `/delete-resource`
   - **Method:** DELETE
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Request Body:**
     ```json
     {
       "id": 6
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Success",
       "data": null
     }
     ```
```

This README provides all necessary steps and details to run and interact with the backend application, including the list of API endpoints for authentication and CRUD operations.
