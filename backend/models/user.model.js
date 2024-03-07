import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "This email has already been used by someone else"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match.",
    },
  },
});

// Pre-save middleware
userSchema.pre("save", async function () {
  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);

  // Removing passwordConfirm and adminKey
  this.passwordConfirm = undefined;
});

// Instance method
userSchema.methods.checkCredentials = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};

// Creating Model
const User = mongoose.model("User", userSchema);

export default User;
