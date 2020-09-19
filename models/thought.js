// THOUGHT MODEL (Used the "pizza-hunt" module as guide)

// dependencies:
const {
  Schema,
  model,
  Types
} = require('mongoose');
// Moment JS will track time:
const moment = require('moment');

const ReactionSchema = require('./reactions');


// Thought Schema:
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  // The user that created this thought
  username: {
    type: Schema.Types.String,
    required: true,
    ref: 'User'
  },
  // These are like replies. Array of nested documents created with the reactionSchema:
  reactions: [ReactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});


const Thought = model('Thought', ThoughtSchema)

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

module.exports = Thought;