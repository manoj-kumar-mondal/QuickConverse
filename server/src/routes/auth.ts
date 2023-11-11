import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
const router = Router();

const authController = new AuthController();

router.post('/signin', authController.signInHandler);
router.post('/verify-otp', authController.otpVerificationHandler);

export default router;