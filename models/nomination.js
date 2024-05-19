import mongoose, { Schema, model, models } from 'mongoose';
import { categoryArray } from './category';
import moment from 'moment-timezone';

const getCurrentDateInMelbourne = () => {
  return moment().tz('Australia/Melbourne').format('YYYY-MM-DD HH:mm');
};

const awardEnum = categoryArray;

const NominationSchema = new Schema({
  recipientUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a recipient.']
  },
  nominatorFullUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  nominatorBasicUser: {
    basicName: {
      type: String,
      required: false,
    },
    basicEmail: {
      type: String,
      required: false,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
    },
  },
  nominationValue: {
    type: awardEnum,
    required: function() {
      return !this.isNominationInstant
    },
  },
  nominationBody: {
    type: String,
    required: [true, 'Please add a reason for the nomination.'],
  },
  nominationDate: {
    type: String,
    required: true,
    default: getCurrentDateInMelbourne,
  },
  isNominatorFullUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  isNominationInstant: {
    type: Boolean,
    required: true,
    default: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  isReleased: {
    type: Boolean,
    required: true,
    default: false,
  },
  releasedDate: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
      return moment(v, 'YYYY-MM-DD HH:mm', true).isValid()
      },
      message: props => `${props.value} is not a valid date. Please provide a date in the format 'YYYY-MM-DD HH:mm' using 24 hours time.`
    },
  }
});

const Nomination = models.Nomination || model('Nomination', NominationSchema);

export default Nomination;
