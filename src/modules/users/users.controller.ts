import { Request, Response } from 'express';
import { UserServices } from './users.service';
import userZodValidationSchema from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userZodValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User didnot created!',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not fetched',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const result = await UserServices.getSingleUserFromDB(userIdNumber);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User did not fetched',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const result = await UserServices.deleteUserFromDB(userIdNumber);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User didnot deleted!',
      error: error,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const { user: userData } = req.body;

    const zodParsedData = userZodValidationSchema.parse(userData);
    const result = await UserServices.updateUserById(
      userIdNumber,
      zodParsedData,
    );

    // const result = await UserServices.updateUserById({ userIdNumber }, userData);
    res.status(200).json({
      status: 'Success',
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User didnot updated!',
      error: error,
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const result = await UserServices.getSingleUserOrdersFromDB(userIdNumber);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      const orders = result;
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: orders,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const result = await UserServices.getUserTotalPriceFromDB(userIdNumber);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      const orders = result;
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: orders,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserById,
  getSingleUserOrders,
  getUserTotalPrice,
};
