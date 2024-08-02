import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import session from "express-session";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";

const app = express();

const __dirname = path.resolve();

app.use(
  session({
    secret: ENV_VARS.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.join("Welcome to Netflix API");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/netflix-client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "netflix-client", "dist", "index.html")
    );
  });
}

app.listen(ENV_VARS.PORT, () => {
  console.log("Server is running on port", ENV_VARS.PORT);
  console.log("Trying to connect to MongoDB...");
  connectDB();
});
