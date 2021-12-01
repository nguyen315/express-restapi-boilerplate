import BaseCtrl from 'src/base.controller.js'
import { controller, post, get } from 'route-decorators'
import httpStatusCodes from 'http-status-codes'
import { hashPassword } from 'src/utils/crypto'
import db from 'src/models/index'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { validateEmail, checkPassword } from './auth.service'
import { ACCOUNT_STATUS, ROLE } from 'src/utils/constants'
import { auth } from './auth.middleware'

@controller('/api/auth')
class AuthCtrl extends BaseCtrl {
  @post('/register')
  async register(req, res) {
    // TODO: move logic to service
    const { username, email, password, firstName, lastName } = req.body

    //Validate and check acc
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' })
    }

    const checkUsername = await db.User.findOne({
      where: { username },
    })

    if (checkUsername) {
      return res.status(400).json({ success: false, message: 'Username already exists. ' })
    }

    if (checkPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must at least 6 characters.',
      })
    }
    try {
      const hash = await hashPassword(password)

      const newUser = await db.User.create({
        username,
        email,
        password: hash,
        firstName,
        lastName,
        role: ROLE.USER,
        // TODO: Change to PENDING when need to verify email
        status: ACCOUNT_STATUS.ACTIVE,
      })

      res.status(httpStatusCodes.CREATED).json({
        success: true,
        message: 'Register Success!',
      })
    } catch (err) {
      res.status(httpStatusCodes.BAD_REQUEST).send(err.message)
    }
  }

  @post('/login')
  async login(req, res, next) {
    await passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.send({
          success: false,
          message: 'Incorrect username or password',
        })
      }
      req.logIn(user, { session: false }, (loginErr) => {
        if (loginErr) {
          return next(loginErr)
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET || 'meomeo')
        return res.send({
          success: true,
          message: 'authentication succeeded',
          token,
          user,
        })
      })
    })(req, res, next)
  }

  @get('/me', auth())
  async getUserInfo(req, res) {
    res.status(httpStatusCodes.OK).send(req.user)
  }
}
export default AuthCtrl
