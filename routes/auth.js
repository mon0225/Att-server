const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    if (!theUser) {
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong' });
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user)
    });
  })(req, res, next);
});

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || email === "" || password === "") {
    res.status(401).json({message: "Indicate username and password"});
    return;
  }
  User.findOne({username})
  .then(user => {
    if (user !== null) {
      res.status(401).json({message: "The username already exists"});
      return;
    } else {
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({username, password: hashPass});
      newUser.save()
      .then(user => {
        res.status(200).json(user)
      })
      .catch((err) => {
        res.status(401).json({message: "Something went wrong"});
      })
    }
  })
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message: 'You are out!'})
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.get('/admin',  (req,res)=>{
  const admin = req.user.role === 'ADMIN';
  res.render("privado", {admin});
});

authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;
