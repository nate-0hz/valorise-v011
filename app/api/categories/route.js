import Category from '@/models/category';
import { connectToDB } from '@/utils/database';

export const POST = async (request) => {
  const {
    categoryName,
    categoryDescription,
    championAnimal,
    categoryImage } = await request.json();

    try {
      await connectToDB();
      const newCategory = new Category({
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        championAnimal: championAnimal,
        categoryImage: categoryImage
      });

      await newCategory.save();
      return new Response(JSON.stringify(newCategory), { status: 201 })
    } catch (error) {
      return new Response("Failed to create category.", { status: 500 });
    }
}