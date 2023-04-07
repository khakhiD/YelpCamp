const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register.ejs");
}

module.exports.register = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash("success", `${username.replace(/^[a-z]/, (char) => char.toUpperCase())}! Welcome to Yelp Camp!`);
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) next(err);
        req.flash("success", "Successfully logged-out 👋");
        res.redirect("/campgrounds");
    });
}