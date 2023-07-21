import mongoose from 'mongoose'

const Schema = mongoose.Schema

const model = mongoose.model

const PostSchema = new Schema(
  {
    title: {
      type: String,
      min: 5,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      min: 10,
      required: true,
    },
    tags: [{ type: String, trim: true, min: 1, required: true }],
    entry: {
      type: String,
      min: 10,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)

PostSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

PostSchema.pre('deleteMany', { document: true, query: false }, function (next) {
  this.model('Comment').deleteMany({ commentOn: this._id }, next)
})
const Post = model('Post', PostSchema)

export default Post
