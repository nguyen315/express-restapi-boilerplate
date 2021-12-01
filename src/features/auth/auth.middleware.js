import httpStatusCodes from 'http-status-codes'
import passport from 'passport'
import { ROLE } from 'src/utils/constants.js'

export function auth() {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next)
  }
}

export function ensureAdmin() {
  return async (req, res, next) => {
    const user = req.user
    const { role } = user
    if (!role === ROLE.ADMIN) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send({ message: 'You do not have permission to perform this action`' })
    } else {
      next && (await next())
    }
  }
}
