const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    msg: "Welcome",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        msg: "Post created...",
        data,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "xyz",
    email: "xyz@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey", {expiresIn: '20s'}, (err, token) => {
    res.json({
      token: token,
    });
  });
});

// Token Header format : alpha access_token
function verifyToken(req, res, next) {
  const alphaHeader = req.headers.authorization;
  if (typeof alphaHeader !== "undefined") {
    const arr = alphaHeader.split(" ");
    const val = arr[1];
    req.token = val;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
