import Nomination from "@/models/nomination";
import { connectToDB } from "@/utils/database";

// GET - all nominations in db
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const nomination = await Nomination.find()

    return new Response(JSON.stringify(nomination), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch category list.', { status: 500 })
  }
}