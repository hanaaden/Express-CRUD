````markdown
#  Express CRUD API - Line by Line Explanation


---


Create a file called `server.js` and start coding.

---

## **Code Explanation**

```js
const express = require("express")
```

* Imports the Express library to create a server and handle HTTP requests.

```js
const app = express()
```

* Creates an Express application instance called `app`.
* This `app` will handle all routes and middleware.

```js
app.use(express.json())
```

* Middleware that allows Express to parse incoming JSON data from the request body.
* Essential for **POST** and **PUT** requests.

```js
let users = [
    { id: 1, name: "Jane" },
    { id: 2, name: "John" }
]
```

* An **in-memory array** acting as a fake database.
* Each object represents a user with `id` and `name`.

---

### **GET /users** - Read all users

```js
app.get("/users", (req, res) => {
    res.json(users)
})
```

* `app.get("/users")` defines a GET route at `/users`.
* `req` = incoming request object.
* `res` = response object.
* `res.json(users)` sends the `users` array as a JSON response.
* **Purpose:** Retrieve all users.

---

### **POST /users** - Create a new user

```js
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser)
})
```

**Line by line:**

1. `app.post("/users", ...)` → defines a POST route to create a new user.
2. `const newUser = {...}` → creates a new user object with:

   * `id` → next number in the array
   * `name` → value from JSON body sent in Postman (`req.body.name`)
3. `users.push(newUser)` → adds the new user to the array.
4. `res.status(201).json(newUser)` → returns the newly created user and sends HTTP status 201 (Created).

**Purpose:** Add a new user to the list.

---

### **PUT /users/:id** - Update an existing user

```js
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(u => u.id === userId)
    if (!user) return res.status(404).json({ message: "User not found" })
    user.name = req.body.name
    res.json(user)
})
```

**Line by line:**

1. `:id` → route parameter for the user ID.
2. `parseInt(req.params.id)` → converts the string ID from the URL to a number.
3. `users.find(u => u.id === userId)` → searches for the user object in the array.
4. `if (!user)` → if user doesn’t exist, return 404 error.
5. `user.name = req.body.name` → update the user’s name.
6. `res.json(user)` → return the updated user object.

**Purpose:** Modify an existing user's information.

---

### **DELETE /users/:id** - Remove a user

```js
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) return res.status(404).json({ message: "User not found" })
    users.splice(userIndex, 1)
    res.json({ message: "User deleted successfully" })
})
```

**Line by line:**

1. `req.params.id` → get ID from URL.
2. `findIndex` → find the index of the user in the array.
3. `if (userIndex === -1)` → return 404 if user not found.
4. `users.splice(userIndex, 1)` → remove the user from the array.
5. `res.json({ message: ... })` → return confirmation message.

**Purpose:** Delete a user from the list.

---

### **Starting the Server**

```js
app.listen(5000, () => console.log("the server is running on port 5000"))
```

* Starts the Express server on **port 5000**.
* The callback logs a message confirming the server is running.

---

## **Testing**

* Use **Postman** to test all routes:

  * GET `/users` → fetch all users
  * POST `/users` → add new user
  * PUT `/users/:id` → update user
  * DELETE `/users/:id` → remove user

* Remember: no extra spaces in URL (`/users%20` will fail).

---

## **Key Learnings**

* Understanding **CRUD operations** in Express.
* Using **req.body** for POST/PUT and **req.params** for route parameters.
* Importance of **express.json()** middleware.
* Debugging common errors (`Cannot GET/POST /users`, trailing spaces in URLs).
* Testing APIs effectively with Postman.

---

### Summary

This project started from **setting up Express**, adding a **fake database**, and implementing **GET, POST, PUT, DELETE routes**, with **line-by-line understanding of each part**.

You now have a **fully working CRUD API** ready to use and expand for future projects.

---

 **Read the full documentation in this project:** [Link to this README](https://docs.google.com/document/d/1CcZaxHW8BjIlxweR_pLE6jlFVcA0qmfyCuQlOhftsos/edit?usp=sharing)

```

---
