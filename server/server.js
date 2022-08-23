const express = require('express')
const app = express()

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree", "anotherUser", "testingAgain"] })
})

app.listen(5003, () => { console.log("server started on port 5003") })