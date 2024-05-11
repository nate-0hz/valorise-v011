import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  nominationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref 'Nomination',
    required: true,
  },
  commenterId: {
    type: mongoose.Schema.Types.OjectId,
    ref: 'User',
    required: true,
  },
  commentBody: {
    type: String,
    required: [true, 'Please enter a comment.'],
  },
  commentDate: {
    type: String,
    required: true,
  }
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;