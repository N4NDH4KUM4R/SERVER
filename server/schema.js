const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Cpassword: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Register", dataSchema);
