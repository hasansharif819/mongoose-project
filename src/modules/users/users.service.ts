import { TUser } from './users.interface';
import { Users } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await Users.isUserExists(userData.userId)) {
    throw new Error('User / Student already exists!!!!');
  }
  const result = await Users.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
