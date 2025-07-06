import express, {Router} from 'express'
import isLoggedIn from '../../../middleware/middleware'
import asyncErrorHndler from '../../../services/asyncErrorHandler'
import { createCategory, deleteCategory, getCategories } from '../../../controller/institute/category/categoryController'

const router:Router = express.Router()

router.route('/')
.post(isLoggedIn, asyncErrorHndler(createCategory))
.get(isLoggedIn,asyncErrorHndler(getCategories))

router.route('/:id').delete(isLoggedIn, asyncErrorHndler(deleteCategory))

export default router