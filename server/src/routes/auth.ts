import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
const router = Router();

router.post('/signin', AuthController.signInHandler);
router.post('/verify-otp', AuthController.otpVerificationHandler);
router.post('/new-registration', AuthController.validatedRoute, AuthController.newRegistrationHandler);

export default router;