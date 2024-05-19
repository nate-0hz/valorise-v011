import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

// GET - all nominations in db
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const comment = await Comment.find()

    return new Response(JSON.stringify(comment), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch category list.', { status: 500 })
  }
}