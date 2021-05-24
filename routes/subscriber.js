const express = require("express");
const Subscriber = require("../models/subscriber");
const router = express.Router();

//get all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get one
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber);
});
//create one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    SubscriberChannel: req.body.SubscriberChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//update one
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.SubscriberChannel !== null) {
    res.subscriber.SubscriberChannel = req.body.SubscriberChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//delete one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "oops" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  console.log(subscriber);
  next();
}
module.exports = router;
