import { TUser } from './users.interface';
import { Users } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await Users.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
