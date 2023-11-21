const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petStatus: {
      type: String,
      required: true,
  },
  type: {
      type: String,
      required: true,
  },
  sex: {
      type: String,
      required: true,
  },
  petName: {
      type: String,
      required: true,
  },
  lastSeenAdd: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
  },
  lastSeenDate: {
      type: Date,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  reportImage: {
      type: String,
      required: true,
  }, // Assuming you store image path or URL
  latitude: {
      type: Number,
      required: true,
  }, // Change from lat to latitude
  longitude: {
      type: Number,
      required: true,
  },
  userName: { type: String }, 
  userId: { type: String },
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
