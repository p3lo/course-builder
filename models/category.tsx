import mongoose from 'mongoose';

const category = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  ],
});

delete mongoose.connection.models['Category'];
const Category = mongoose.models.Category || mongoose.model('Category', category);
//export default mongoose.models.user || mongoose.model('User', user);
export default Category;
