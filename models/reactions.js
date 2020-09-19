// dependencies:
const {
    Schema,
    model,
    Types
} = require('mongoose');
// Moment JS will track time:
const moment = require('moment');


// Reaction (Schema Only!):
const ReactionSchema = new Schema({
    // Use Mongoose's ObjectId data type
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
}, {
    toJSON: {
        getters: true
    }
});


// Export Reaction model schema
module.exports = ReactionSchema;