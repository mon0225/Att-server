const express = require("express");
const router = express.Router();
const Feelings = require("../models/Feelings")

router.get("/feeling", (req, res, next) => {
    res.render("/feeling");
  });

router.post("/feeling", (req, res, next) => {
    const happy = req.body.happy;
    const meh = req.body.meh;
    const unhappy = req.body.unhappy;
    if (happy === "" || meh === "" || unhappy === "") {
      res.status(401).json({message: "Indicate feeling"});
      return;
    }
    User.findOne({feeling})
    .then(feeling => {
        if (feeling !== null) {
            return res.status(200).json({ Feeling })
      } else {
        const newFeeling = new Feeling({happy,meh,unhappy});
        newFeeling.save()
        .then(feelings => {
          res.status(200).json(feelings)
        })
        .catch((err) => {
          res.status(401).json({message: "Something went wrong"});
        })
      }
    })
  });

 

  module.exports = router;