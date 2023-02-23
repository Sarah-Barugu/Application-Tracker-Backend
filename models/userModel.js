const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  emailAddress: {
    type: String,
    unique: [true, "Email already exist in our database"],
    required: [true, "please provide your email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
    minlength: 6,
    // select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "both password are not the same ",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: "user.png",
  },
  location: {
    type: String,
  },
  skills: [String],
  tools: [String],
  aboutMe: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordTokenExpirationDate: Date,
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined;
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

UserSchema.methods.comparePassword = async function (clientPassword) {
  const isMatch = await bcrypt.compare(clientPassword, this.password);
  return isMatch;
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp; // returns true or false
  }

  // False means NOT changed
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordTokenExpirationDate = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
