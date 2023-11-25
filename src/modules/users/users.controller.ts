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
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student could not create successfully',
      error: error,
    });
  }
};
export const UserController = {
  createUser,
};
