import { TUser } from './users.interface';
import { Users } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await Users.isUserExists(userData.userId)) {
    throw new Error('User already exists!!!!');
  }
  const result = await Users.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  //   const result = await Users.find();
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
  if (result.length === 0) {
    throw new Error('User did not fetched');
  }
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await Users.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserById = async (userId: number, userData: TUser) => {
  const result = await Users.updateOne({ userId }, userData);
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
};
