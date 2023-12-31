import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUsers);

router.get('/users/:userId', UserController.getSingleUser);

router.delete('/users/:userId', UserController.deleteUser);

router.put('/users/:userId', UserController.updateUserById);

router.get('/users/:userId/orders', UserController.getSingleUserOrders);

router.get(
  '/users/:userId/orders/total-price',
  UserController.getUserTotalPrice,
);
router.put('/users/:userId/orders', UserController.updateOrder);

export const UserRoute = router;
