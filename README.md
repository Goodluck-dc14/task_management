## API Endpoints

### User Endpoints

- **Get All Users**  
  `GET http://localhost:1111/api/user/all`  
  Retrieves a list of all users.

- **Get Single User**  
  `GET http://localhost:1111/api/user/single_user`  
  Retrieves details of a single user. Requires Bearer token authentication.

- **Sign Up**  
  `POST http://localhost:1111/api/user/signup`  
  Creates a new user account.

- **Sign In**  
  `POST http://localhost:1111/api/user/signin`  
  Logs in a user and returns a JWT token.

### Task Endpoints

- **Create Task**  
  `POST http://localhost:1111/api/task/create`  
  Creates a new task.

- **Get All Tasks**  
  `GET http://localhost:1111/api/task/`  
  Retrieves a list of all tasks.

- **Get Single Task**  
  `GET http://localhost:1111/api/task/:taskId`  
  Retrieves details of a single task by its ID.

- **Update Task**  
  `PUT http://localhost:1111/api/task/update/:taskId`  
  Updates an existing task by its ID.

- **Delete Task**  
  `DELETE http://localhost:1111/api/task/delete/:taskId`  
  Deletes a task by its ID.
