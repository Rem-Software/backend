/** Libraries */
import { Schema, model } from "mongoose";

const StudentGroupSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  sectionUrl: {
    type: String,
    unique: true,
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
  isSuspended: {
    type: Boolean,
    default: false,
  },
  isPremium: {
    type: Boolean,
    default: true,
  },
});

StudentGroupSchema.methods.toJSON = function () {
  const { __v, password, ...studentGroup } = this.toObject();
  return studentGroup;
};

const StudentGroup = model("StudentGroup", StudentGroupSchema);
export default StudentGroup;
