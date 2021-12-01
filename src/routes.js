import express from 'express'
import path from 'path'
import { requireDir } from './utils/index'

const router = express.Router()

const classes = requireDir(path.join(__dirname, './features'), ['base.js'])
const controllers = classes.map((Controller) => new Controller.default())
for (const controller of controllers) {
  router.use(controller.router)
}

export default router
