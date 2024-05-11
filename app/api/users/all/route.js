import User from "@/models/user";
import { connectToDB } from "@/utils/database";


// GET - all users in db
export const GET = async (request, {params }) => {
  try {
    await connectToDB()

    // const users = await Users.find({ user: params.email }).populate("email")
    const users = await User.find()

    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch user list.", { status: 500 })
  }
}

