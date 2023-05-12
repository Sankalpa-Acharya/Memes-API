import express from 'express'
import {homeViewController} from "../controllers/homeViewController.js"
import {apiController} from "../controllers/apiController.js"

const router = express.Router()


router.get('/',homeViewController)
router.get('/api',apiController)


export default router