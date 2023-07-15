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
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    entry: {
      type: String,
      min: 10,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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

PostSchema.pre('update', function (next) {
  const post = this
  post
    .model('User')
    .update({}, { $pull: { posts: post.id } }, { multi: true }, next)
})

const Post = model('Post', PostSchema)

export default Post
