const express = require("express")
const app = express()
app.use(express.json())

let users = [
    {id: 1 , name : "Jane"},
    {id: 2 , name : "John"}
]


app.get("/users" , (req ,res)=>{
    res.json(users)
})

app.post("/users" , (req ,res)=>{
    const newUser = {
        id : users.length + 1 ,
        name : req.body.name
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

app.put("/users/:id" , (req ,res)=>{
    const userId = parseInt(req.params.id)
    const user = users.find(u=>u.id === userId)
    if(!user){
    return res.status(404).json({messege : "user not found"})
    } 
    user.name = req.body.name
    res.json(user)
})

app.delete("/users/:id" ,(req ,res)=>{
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === userId)
    if(userIndex === -1){
        return res.status(404).json({messege : "user not found"})

    }
    users.splice(userIndex , 1)
    res.json({messege : "deleted successfully"})
})
app.listen(5000, ()=> console.log("server is running on port 5000"))