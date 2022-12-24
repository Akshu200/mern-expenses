import { Router } from 'express'
import User from '../models/User.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router();
import {login, register} from '../controller/AuthController.js'

router.post('/register',register)


router.post('/login', login)

export default router;