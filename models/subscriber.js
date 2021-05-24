const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SubscriberChannel: {
    type: String,
    // required: true,
  },
  SubscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model("subscriber", subscriberSchema);
