const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/authController");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   authController.googleCallback
// );
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }

      if (!user) {
        console.log("Authentication failed:", info);
        return res.redirect("/login");
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return res.redirect("/login");
        }

        // Authentication successful, redirect to the desired page
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  },
  authController.googleCallback
);

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect("/login");
};

module.exports = router;
