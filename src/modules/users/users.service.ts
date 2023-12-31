/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { TUser, TOrders } from './users.interface';
import { Users } from './users.model';

const createUserIntoDB = async (payload: TUser) => {
  if (await Users.isUserExists(payload.userId)) {
    throw new Error('User already exists!!!!');
  }
  const result = await Users.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await Users.aggregate([
    { $match: {} },
    { $project: { password: 0, __v: 0, isDeleted: 0 } },
    { $sort: { userId: 1 } },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await Users.aggregate([
    { $match: { userId } },
    { $project: { password: 0, __v: 0, isDeleted: 0 } },
  ]);

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await Users.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserById = async (userId: number, payload: Partial<TUser>) => {
  const result = await Users.updateOne({ userId }, payload);
  return result;
};

const getSingleUserOrdersFromDB = async (userId: number) => {
  const result = await Users.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        orders: { $push: '$orders' },
      },
    },
    { $project: { _id: 0, orders: 1 } },
  ]);
  return result;
};

const getUserTotalPriceFromDB = async (userId: number) => {
  const result = await Users.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        orders: { $push: '$orders' },
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { totalPrice: 1, _id: 0 } },
  ]);
  return result[0];
};

const updateOrderById = async (userId: number, orderData: TOrders) => {
  const result = await Users.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserById,
  getSingleUserOrdersFromDB,
  getUserTotalPriceFromDB,
  updateOrderById,
};
