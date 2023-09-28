const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  profileDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProfile",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  bookmark: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  followers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
  ],
  following:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
  ]
});
UserSchema.pre("save", function (next) {
  if (!this.posts) {
    this.posts = [];
  } else if (!this.bookmark) {
    this.bookmark = [];
  }
  next();
});
module.exports = mongoose.model("users", UserSchema);
