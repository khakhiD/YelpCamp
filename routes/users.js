const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

router.post("/register", catchAsync(async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        req.flash(
            "success",
            `${username.replace(/^[a-z]/, (char) => char.toUpperCase())}! Welcome to Yelp Camp!`
        );
        res.redirect("/campgrounds");
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

module.exports = router;
