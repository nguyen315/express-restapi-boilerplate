import { hashPassword, checkPassword } from '../utils/crypto'

export default (sequelize, DataTypes) => {
  const schema = {
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }

  const userModel = sequelize.define('User', schema)

  userModel.authenticate = async (username, plainPassword) => {
    const user = await userModel.findOne({ where: { username }, raw: true })
    if (!user) {
      return null
    }
    const isPasswordCorrect = await checkPassword(plainPassword, user.password)
    if (isPasswordCorrect) {
      user.password = undefined
      return user
    } else {
      return null
    }
  }

  userModel.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
  }

  return userModel
}
