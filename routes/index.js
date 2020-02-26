const express   = require('express'),
      passport  = require("passport");
const User      = require('../models/user');

const router = express.Router({mergeParams: true});

// ----------------------------------------------------------------
// Registration
// ----------------------------------------------------------------

// show sign up form
router.get('/signup', (req, res) => {
    res.render('register');
});

// create new user
router.post('/signup', (req, res) => {
    console.log(req.body);
    User.register({username: req.body.username}, req.body.password, function(err, newUser){
        if (err) {
            console.log(err);
            res.redirect("/signup");
        }
        else {
            console.log("Create new user");
            console.log(newUser);
            passport.authenticate("local")(req, res, () => res.redirect("/vis"));
        }
    });
});

// ----------------------------------------------------------------
// Authentication
// ----------------------------------------------------------------

// shows login form
// router.get("/login", (req, res) => res.render("login"));

// log in user
router.post("/login", passport.authenticate("local", {
    successRedirect: "/vis",
    failureRedirect: "/login"
}), (req, res) => res.redirect("login"));

// log out user
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;

