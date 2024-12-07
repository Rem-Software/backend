/** Libraries */
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  isPremium: {
    type: Boolean,
    default: true,
  },
});

// Method to exclude certain fields from the JSON response
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

// Export the User model
const User = model("User", UserSchema);
export default User;
