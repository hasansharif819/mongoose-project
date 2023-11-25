import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUsers);

router.get('/users/:userId', UserController.getSingleUser);

router.delete('/users/:userId', UserController.deleteUser);

router.patch('/users/:userId', UserController.updateUserById);

// router.get('/users/:userId/orders', UserController.getSingleUserOrders);

export const UserRoute = router;
