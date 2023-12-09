/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TOrders,
  TUser,
  TUserName,
  UserModel,
} from './users.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Last Name can not be more than 20 characters'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Street can not be more than 20 characters'],
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Street can not be more than 20 characters'],
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Street can not be more than 20 characters'],
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, 'Username can not be more than 20 characters'],
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [ordersSchema],
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post middleware save
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

//Query Middleware
//isDeleted field true hole data show korbe na
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//findOne er jonno
userSchema.pre('find', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

//Aggregate function er jonno
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await Users.findOne({ userId });
  return existingUser;
};

// export const Users = model<TUser>('Users', userSchema);
export const Users = model<TUser, UserModel>('Users', userSchema);
