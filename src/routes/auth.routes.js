/** Libraries */
import { Router } from "express";
import { check } from "express-validator";

/** Middlewares */
import { validateFields } from "../middleware/validate.fields.js";
import { jwtValidateStudentGroup } from "../middleware/jwt.validate.js";

/** Controllers */
import {
  signUpController,
  loginController,
  tokenRevalidate,
} from "../controllers/auth.controllers.js";

/** Utils */
import { studentGroupNameExists } from "../utils/db.validator.js";

const router = Router();

router.post(
  "/groups/signup",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(), // Translated message
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres."
    ).isLength({
      min: 6,
    }),
    check("email", "El correo electrónico no es válido.").isEmail(), // Translated message
    check("email").custom(studentGroupNameExists), // Check if email already exists
    validateFields,
  ],
  signUpController
);

router.post(
  "/groups/login", // Keep the same endpoint for login
  [
    check(
      "email",
      "El correo electrónico es obligatorio y debe ser un correo válido."
    ).isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres."
    ).isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginController
);

router.get(
  "/groups/renew",
  [jwtValidateStudentGroup, validateFields],
  tokenRevalidate
);

export { router as authRouter };
