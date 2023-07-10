import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    hashedPassword: { type: String, required: false, default: null },
    isStaff: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://ui-avatars.com/api/?name=xz&bold=true&size=70&color=a0a0a0',
    },
    bio: {
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

const User = model('User', UserSchema)

export default User
