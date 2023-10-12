const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  sonOrHusbandName: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  dob: {
    type: Date,
  },
  maritalStatus: {
    type: String,
  },
  aadharNumber: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
