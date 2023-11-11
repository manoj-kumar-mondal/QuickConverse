import { Router } from 'express';
import { otpVerificationHandler, signInHandler } from '../controllers/auth.controller.js';
const router = Router();

router.post('/signin', signInHandler);
router.post('/verify-otp', otpVerificationHandler);

export default router;