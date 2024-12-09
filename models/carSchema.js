const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
      minlength: 3, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{11}$/,
    },
    city: {
      type: String,
      required: true,
    },
    maxPictures: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    images: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
