import express from "express";
import passport from "passport";

import {
  signup,
  login,
  logout,
  authCheck,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const router = express.Router();

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        generateTokenAndSetCookie(existingUser.id, request.res);
        return done(null, existingUser);
      }

      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        provider: "google",
      });

      await newUser.save();
      generateTokenAndSetCookie(newUser._id, request.res);

      done(null, newUser, { token });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/api/v1/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        githubId: profile.id,
        username: profile.username,
        image: profile.photos[0].value,
        provider: "github",
      });

      await newUser.save();

      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/currentUser", (req, res) => {
  res.json(req.user);
});

router.get("/authCheck", protectRoute, authCheck);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  (req, res) => {
    generateTokenAndSetCookie(req.user._id, res);
    res.redirect(process.env.CLIENT_URL);
  }
);

router.put("/updateProfile", protectRoute, updateProfile);

export default router;
