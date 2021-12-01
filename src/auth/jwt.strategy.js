import passport from 'passport'
import db from 'src/models'

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET || 'meomeo',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { userId } = token
        const user = await db.User.findByPk(userId, {
          attributes: {
            exclude: ['password'],
          },
          raw: true,
        })

        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
