import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  contactNo: {
    type: String,
    required: true,
    match: [/^\d+$/, 'Contact number should contain only digits']
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Demo', 'Real', 'Admin'], // Three user roles
    required: true,
    default: 'Demo' // Default role is Demo
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
