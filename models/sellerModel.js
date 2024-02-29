// sellerModel.js

const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  shopName: String,
  ownerName: String,
  mobileNo: String,
  altMobile: String,
  email: String,
  place: String,
  tal: String,
  dist: String,
  state: String,
  pinCode: String,
  country: String,
  gstNo: String,
  shopActLicense: String,
  bankDetails: {
    name: String,
    accountNo: String,
    bankName: String,
    ifsc: String,
  },
  panCardNo: String,
  udyamAadhar: String,
  udyogAadhar: String,
  aadharDetails: String,
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
