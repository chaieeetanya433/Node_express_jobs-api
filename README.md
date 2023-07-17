### PROJECT SET-UP

In order to spin up the project, in the root create .env with these two variables, with your own values.

# Database Connection
1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

# Routers
=> auth.js
=> jobs.js

# User Model
Email Validation Regex

=> /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

# Register User

1. Validate - name, email, password - with Mongoose
2. Hash Password (with bcryptjs)
3. Save User
4. Generate Token
5. Send Response with Token

# Login User

1. Validate - email, password - in controller
2. If email or password is missing, throw BadRequestError
3. Find User
4. Compare Passwords
5. If no user or password does not match, throw UnauthenticatedError
6. If correct, generate Token
7. Send Response with Token

# Mongoose Errors

1. Validation Errors
2. Duplicate (Email)
3. Cast Error

# Security

1. helmet
2. cors
3. xss-clean
4. express-rate-limit

# Swagger UI

/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id