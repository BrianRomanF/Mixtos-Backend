import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
   // select: false, // Hide password field by default when querying the database
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['admin', 'user'], // You can customize the account types as needed
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isValidPassword =  async function(password){
  try{
    console.log("password:", password)
    console.log("this Password:", this.password)
    console.log("password hash:", password)
    return await  bcrypt.compare(password.trim(), this.password.trim())
  }catch(error){

  }
}

const User = mongoose.model('User', userSchema);

export default User;