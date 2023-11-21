const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((error) => {
    console.error(`Connection error: ${error}`);
  });
