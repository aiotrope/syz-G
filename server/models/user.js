const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    hashedPassword: { type: String, required: false, default: null },
    isStaff: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      required: false,
      default: null,
    },
    facebookId: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)

UserSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
