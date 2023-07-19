import mongoose from 'mongoose'

const Schema = mongoose.Schema

const model = mongoose.model

const CommentSchema = new Schema(
  {
    commentary: {
      type: String,
      min: 4,
      required: true,
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)

CommentSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Comment = model('Comment', CommentSchema)

export default Comment
