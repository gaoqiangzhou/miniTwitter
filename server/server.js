const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);

mongoose
  .connect(
    "mongodb+srv://zhou:cc12112@cluster0.ebnlf4j.mongodb.net/MiniTwitter?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Mini Twitter is running at port 3000");
    });
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

