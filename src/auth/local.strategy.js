import db from '../models/index'

const passport = require('passport')
const localStrategy = require('passport-local').Strategy

passport.use(
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await db.User.authenticate(username, password)
        if (!user) {
          return done(null, false, { message: 'Wrong Credential' })
        }
        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)
