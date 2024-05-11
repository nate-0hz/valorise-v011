import Category from "@/models/category";
import { connectToDB } from "@/utils/database";

// GET - all categories in db
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const categories = await Category.find()

    return new Response(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch category list.', { status: 500 })
  }
}