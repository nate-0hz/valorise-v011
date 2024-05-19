import mongoose, { Schema, model, models } from 'mongoose';
import moment from 'moment-timezone';

const CommentSchema = new Schema({
  nominationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nomination',
    required: true,
  },
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentBody: {
    type: String,
    required: [true, 'Please enter a comment.'],
  },
  commentDate: {
    type: String,
    validate: {
      validator: function(v) {
      return moment(v, 'YYYY-MM-DD HH:mm', true).isValid()
      },
      message: props => `${props.value} is not a valid date. Please provide a date in the format 'YYYY-MM-DD HH:mm' using 24 hours time.`
    },
  }
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;