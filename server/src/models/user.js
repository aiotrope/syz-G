import { Schema, model } from 'mongoose'

let avatar_url =
  'https://ui-avatars.com/api/?name=xz&bold=true&size=70&color=a0a0a0'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashedPassword: { type: String, required: false, default: null },
    isStaff: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      required: true,
      default: avatar_url,
    },
    bio: {
      type: String,
      required: true,
      default: function () {
        return `Hello, World! I'm ${this.username}`
      },
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
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

UserSchema.pre('save', function (next) {
  if (this.avatar === null) {
    this.avatar = avatar_url
  }
  next()
})

const User = model('User', UserSchema)

export default User
