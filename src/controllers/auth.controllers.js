/** Services */
import {
  loginService,
  renewService,
  signUpService,
} from "../services/auth.services.js";

/** Utils */
import { handleError } from "../utils/handle.errors.js";

export const signUpController = async (req, res) => {
  try {
    const data = await signUpService(req.body);
    const { studentGroup, token } = data; // Changed user to studentGroup
    res.status(200).json({
      studentGroup, // Changed user to studentGroup
      token,
    });
  } catch (error) {
    if (error.message.includes("ya está registrado")) {
      return handleError(res, error.message, {}, 409); // Conflict status for existing student group
    }
    return handleError(res, "Something Went Wrong", {}, 400);
  }
};

export const loginController = async (req, res) => {
  try {
    const data = await loginService(req.body);
    const { studentGroup, token } = data; // Changed user to studentGroup
    res.status(200).json({
      studentGroup, // Changed user to studentGroup
      token,
    });
  } catch (error) {
    return handleError(res, error.message, {}, 400);
  }
};

export const tokenRevalidate = async (req, res) => {
  const { studentGroup: reqStudentGroup } = req; // Changed user to studentGroup
  const data = await renewService(reqStudentGroup);
  if (data == null) {
    handleError(res, "Request failed", {}, 403);
    return;
  }
  const { studentGroup, token } = data; // Changed user to studentGroup
  res.status(200).json({
    msg: "OK",
    studentGroup, // Changed user to studentGroup
    token,
  });
};
