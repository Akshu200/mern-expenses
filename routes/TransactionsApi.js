import { Router } from 'express'
import Transaction from '../models/Transaction.js'
import passport from 'passport';
import * as TransactionController from '../controller/TransactionController.js'

const router = Router();

router.get('/',TransactionController.index )     /// create

router.post('/',TransactionController.create)           // save

router.delete('/:id', TransactionController.destroy)    // delete

router.patch('/:id', TransactionController.update)       // update

export default router;