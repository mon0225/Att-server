const express = require("express");
const router = express.Router();
const keys= require('../config/') 
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
const User = require("../models/User");
const Emotion = require('../models/Emotion')

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: keys.IBMUsername,
    password: keys.IBMPassword,
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
  });

  router.post('/', (req, res, next) => {
    const profile = {
        content : {
            contentItems : [
                {
                    content : req.body.texto,
                    contenttype : 'text/plain', 
                    language : 'es'
                }
            ]
        },
        content_type: 'application/json'
    }
    
    personalityInsights.profile(profile, (error, profile)=>{
        (error) ? 
        console.log(error) :
        User.findByIdAndUpdate(req.user.id, {})
        .then(user => {
            const newEmotion = new Emotion({percentil: JSON.stringify(profile.personality[0].children[2].percentile, null, 2)})
            user.emotion= user.emotion.concat(newEmotion)
            user.save()
                .then(result => res.send(result))
        })
        .catch( error => console.log(error))
        
    })
  });

  module.exports = router;