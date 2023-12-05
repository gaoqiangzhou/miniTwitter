const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");
const subscribeRoute = require("./Routes/subscribe");
const suggestRoute = require("./Routes/suggest");
const complainRoute = require("./Routes/complaint")
const disputeRoute = require("./Routes/dispute")

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/subscribe", subscribeRoute);
app.use("/suggest", suggestRoute);
app.use("/complain", complainRoute);
app.use("/dispute", disputeRoute);

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
