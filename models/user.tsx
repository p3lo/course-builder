import mongoose from 'mongoose';

const user = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

delete mongoose.connection.models['User'];
const User = mongoose.models.User || mongoose.model('User', user);
//export default mongoose.models.user || mongoose.model('User', user);
export default User;
