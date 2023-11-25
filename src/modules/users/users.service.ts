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
  const result = await Users.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await Users.aggregate([{ $match: { userId } }]);
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserById,
};
