import mongoose from 'mongoose';

const subcategory = new mongoose.Schema({
  name: { type: String },
});

delete mongoose.connection.models['SubCategory'];
const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subcategory);
//export default mongoose.models.user || mongoose.model('User', user);
export default SubCategory;
