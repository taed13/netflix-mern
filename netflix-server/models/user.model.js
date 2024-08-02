import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [],
  },
  googleId: {
    type: String,
    default: "",
  },
  githubId: {
    type: String,
    default: "",
  },
  provider: {
    type: String,
    default: "",
  },
});

export const User = mongoose.model("User", userSchema);
