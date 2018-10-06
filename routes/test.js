const express = require("express");
const router = express.Router();
const Test = require("../models/Test")


router.post("/test", (req, res, next) => {
      (error) ? 
      console.log(error) :
      Test.findByIdAndUpdate(req.test.id, {})
        .then(test => {
            const newTest = new Test({pendientes: JSON.stringify({test: res.data.test}, null)})
            test.preguntas= test.preguntas.concat(newTest)
            test.save()
                .then(result => res.send(result))
        })
        .catch( error => console.log(error))
        
    });



  module.exports = router;