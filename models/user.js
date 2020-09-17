// USER MODEL (Used the "pizza-hunt" module as guide)

// dependencies
const { Schema, model } = require('mongoose');

// Moment JS will track time
const moment = require('moment');


// Schema
const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    { 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Create User Model using the Schema
const User = model('User', UserSchema);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


// Export User model
module.exports = User;