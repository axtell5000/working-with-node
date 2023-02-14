const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
// middleware to parse what was send / received so we can use it correctly
app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", (request, response) => {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", (request, response) => {
  response.send(
    "<form action='store-user' method='POST'><label>Your Name: </label><input type='text' name='username'><button>Submit</button></form>"
  );
});

app.post("/store-user", (request, response) => {
  const userNmae = request.body.username;

  const filePath = path.join(__dirname, "data", "users.json"); // setting up path to file
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData); // parese to JS object type
  existingUsers.push(userNmae);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // Parsing back to json structure type

  response.send("<h1>Username stored!</h1>");
});

app.get("/users", (request, response) => {
  const filePath = path.join(__dirname, "data", "users.json"); // setting up path to file
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData); // parese to JS object type

  let responseData = "<ul>";

  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }

  responseData += "</ul>";

  response.send(responseData);
});

app.listen(3000);
