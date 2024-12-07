/** Models */
import User from "../models/user.model.js"; // Assuming this is for users
import StudentGroup from "../models/studentGroup.model.js"; // Assuming this is for student groups

// Renamed function to check if user email exists
export const userEmailExists = async (email = "") => {
  const emailConflict = await User.findOne({ email });

  if (emailConflict) {
    throw new Error(`El correo electrónico '${email}' ya está registrado.`); // Spanish message
  }
};

// New function to check if student group name exists
export const studentGroupNameExists = async (name = "") => {
  const nameConflict = await StudentGroup.findOne({ name });

  if (nameConflict) {
    throw new Error(
      `El nombre del grupo estudiantil '${name}' ya está registrado.`
    ); // Spanish message
  }
};
