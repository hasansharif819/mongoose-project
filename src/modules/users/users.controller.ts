/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './users.service';
import { userValidation } from './users.validation';

const {
  createUserZodValidationSchema,
  ordersValidationSchema,
  updateUserZodValidationSchema,
} = userValidation;

const createUser = async (req: Request, res: Response) => {
  try {
    // const { user: userData } = req.body;

    // const zodParsedData = userZodValidationSchema.parse(userData);
    const zodParsedData = createUserZodValidationSchema.parse(req.body);
    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: {
          firstName: result.fullName.firstName,
          lastName: result.fullName.lastName,
        },
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: {
          street: result.address.street,
          city: result.address.city,
          country: result.address.country,
        },
      },
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

      data: result.map((user) => {
        return {
          userId: user.userId,
          username: user.username,
          email: user.email,
          fullName: {
            firstName: user.fullName.firstName,
            lastName: user.fullName.lastName,
          },
          age: user.age,
          isActive: user.isActive,
          hobbies: user.hobbies,
          address: {
            street: user.address.street,
            city: user.address.city,
            country: user.address.country,
          },
          orders: user.orders,
        };
      }),
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
    const userIdNumber = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(userIdNumber);

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result.map((user) => {
          return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            fullName: {
              firstName: user.fullName.firstName,
              lastName: user.fullName.lastName,
            },
            age: user.age,
            isActive: user.isActive,
            hobbies: user.hobbies,
            address: {
              street: user.address.street,
              city: user.address.city,
              country: user.address.country,
            },
            orders: user.orders,
          };
        }),
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const result = await UserServices.deleteUserFromDB(userIdNumber);
    if (result.modifiedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }

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

    const zodParsedData = updateUserZodValidationSchema.parse(req.body);
    const result = await UserServices.updateUserById(
      userIdNumber,
      zodParsedData,
    );
    const data = await UserServices.getSingleUserFromDB(userIdNumber);

    if (result.modifiedCount === 1 && data.length !== 0) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: data.map((user) => {
          return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            fullName: {
              firstName: user.fullName.firstName,
              lastName: user.fullName.lastName,
            },
            age: user.age,
            isActive: user.isActive,
            hobbies: user.hobbies,
            address: {
              street: user.address.street,
              city: user.address.city,
              country: user.address.country,
            },
          };
        }),
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

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
    if (result !== null && result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
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
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
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

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    // const { order: orderData } = req.body;

    const zodParsedData = ordersValidationSchema.parse(req.body);
    const result = await UserServices.updateOrderById(
      userIdNumber,
      zodParsedData,
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
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
  updateOrder,
};
