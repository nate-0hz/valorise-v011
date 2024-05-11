import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { 
    email, 
    name, 
    username, 
    passwordHash, 
    roleTitle, 
    department, 
    lineManagerId,
    image,
    isFullUser,
    isLineManager,
    isSeniorManager,
    isAdmin,
    isActive,
    bioLine, 
    employeeType,
  } = await request.json();

    try {
      await connectToDB();
      const newUser = new User({ 
        name: name, 
        email: email, 
        username: username,
        passwordHash: passwordHash,
        roleTitle: roleTitle, 
        department: department, 
        lineManagerId: lineManagerId,
        image: image,
        isFullUser: isFullUser,
        isLineManager: isLineManager,
        isSeniorManager: isSeniorManager,
        isAdmin: isAdmin, 
        isActive: isActive,
        bioLine: bioLine, 
        employeeType: employeeType, 
      });

      await newUser.save();
      return new Response(JSON.stringify(newUser), {status: 201})
    } catch (error) {
      console.error(error);
      return new Response("Failed to create new user", { status: 500 });
    }
}