/** Libraries */
import jwt from "jsonwebtoken";
import chalk from "chalk"; // Import chalk

/** Models */
import StudentGroup from "../models/studentGroup.model.js"; // Assuming this is for student groups
import User from "../models/user.model.js"; // Assuming this is for users

export const jwtValidateUser = async (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token || token === undefined) {
      return res.status(401).json({
        msg: "There is no token in the request",
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRETORPRIVATEKEY);

    req.id = id;

    const user = await User.findById(id);

    // Validation: Check if user is null
    if (!user) {
      return res.status(404).json({
        msg: "User not found.",
      });
    }

    req.user = user;

    console.log(chalk.green("User validated successfully.")); // Log success message in green

    next();
  } catch (err) {
    console.log(chalk.red("Invalid token."), err); // Log error message in red
    res.status(401).json({
      msg: "invalid token.",
      err,
    });
  }
};

export const jwtValidateStudentGroup = async (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token || token === undefined) {
      return res.status(401).json({
        msg: "There is no token in the request",
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRETORPRIVATEKEY);
    console.log(chalk.blue("ID: "), id);
    req.id = id;

    const studentGroup = await StudentGroup.findById(id);

    // Validation: Check if studentGroup is null
    if (!studentGroup) {
      return res.status(404).json({
        msg: "Student group not found.",
      });
    }

    req.studentGroup = studentGroup;

    console.log(chalk.green("Student group validated successfully.")); // Log success message in green

    next();
  } catch (err) {
    console.log(chalk.red("Invalid token."), err); // Log error message in red
    res.status(401).json({
      msg: "invalid token.",
      err,
    });
  }
};
