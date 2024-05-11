import mongoose, { Schema, model, models } from 'mongoose';

const employeeTypeArray = [
  "Permanent",
  "Fixed Term Employee",
  "Major Service Partner",
  "Contractor",
  "Vendor"
]

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: [true, 'Username already exists!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  passwordHash: {
    type: String,
    required: false,
    // Prevents password being automatically returned
    select: false,
  },
  roleTitle: {
    type: String,
    required: [true, "Role Title is required."],
  },
  department: {
    type: String,
    required: [true, "Department is required."]
  },
  lineManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false,
  },
  image: {
    type: String,
  },
  isFullUser: {
    type: Boolean,
    default: true,
  },
  isLineManager: {
    type: Boolean,
    default: false,
  },
  isSeniorManager: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Admin designation is required"],
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bioLine: {
    type: String,
  },
  employeeType: {
    type: String,
    enum: employeeTypeArray,
    required: [true, "Employee Type is required."],
  },
});

const User = models.User || model("User", UserSchema);

export default User;