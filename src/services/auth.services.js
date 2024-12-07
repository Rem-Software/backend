/** Libraries */
import bcrypt from "bcryptjs";

/** Models */
import StudentGroup from "../models/studentGroup.model.js"; // Updated to import the new model

/** Utils */
import { jwtGenerate } from "../utils/jwt.generate.js";

export const loginService = async ({ email, password }) => {
  const studentGroup = await StudentGroup.findOne({ email }); // Updated to use studentGroup
  if (!studentGroup) {
    throw new Error("El correo electrónico no existe."); // Specific error for non-existent email
  }
  if (!(await bcrypt.compare(password, studentGroup.password))) {
    throw new Error("Contraseña incorrecta."); // Specific error for incorrect password
  }

  const token = await jwtGenerate(studentGroup._id);
  return {
    studentGroup, // Updated to return studentGroup
    token,
  };
};

export const signUpService = async ({ name, sectionUrl, email, password }) => {
  try {
    const existingGroup = await StudentGroup.findOne({ email });
    if (existingGroup) {
      throw new Error("El correo electrónico ya está registrado."); // Error for existing email
    }

    const studentGroupNew = new StudentGroup({
      name,
      sectionUrl,
      email,
      password,
    });

    const salt = bcrypt.genSaltSync();
    studentGroupNew.password = bcrypt.hashSync(password, salt);

    const studentGroupNewFinish = await studentGroupNew.save();

    const token = await jwtGenerate(studentGroupNewFinish._id);

    return {
      msg: "OK",
      studentGroup: studentGroupNewFinish, // Updated to return studentGroup
      token,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Error en el registro"); // Throw error with message
  }
};

export const renewService = async (studentGroup) => {
  const { _id } = studentGroup; // Updated to use studentGroup

  const token = await jwtGenerate(_id);

  return {
    studentGroup, // Updated to return studentGroup
    token,
  };
};
