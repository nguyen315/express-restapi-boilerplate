import express from 'express'

class BaseCtrl {
  constructor() {
    this.router = express.Router()

    for (const { method, url, middleware, fnName } of this.$routes) {
      this.router[method](url, ...middleware, (req, res, next) => {
        this[fnName](req, res, next).catch(next)
      })
    }
  }
}

export default BaseCtrl
