import { Schema, model, models } from 'mongoose';

export const categoryArray = [
  'Say/Do',
  'Commitment',
  'Collaborate',
  'Challenging',
  'Learning',
  'Spirited',
  'Instant'
];

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required.'],
    enum: categoryArray,
  },
  categoryDescription: {
    type: String,
    required: [true, 'Category description is required.']
  },
  championAnimal: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true
  }
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;