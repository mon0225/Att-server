const express = require("express")
const router = express()
const User = require("../models/User")


  
  router.get("/", (req, res, next) => {
    User.find({role: 'USER'})
    .then(users => {
      if (users !== null) {
          return res.status(200).json({ users })
     }else{
        res.status(401).json({message: "The user don't exist"});
     }
    })
    .catch(err => {
        return res.status(500).json({ message: 'Something went wrong' });
    })
})

router.get("/:id", (req,res,next) => {
    User.findById({ _id: req.params.id})
    .then(user => {
        if(user !== null)
        return res.status(200).json({ user })
    })
})

  module.exports = router;