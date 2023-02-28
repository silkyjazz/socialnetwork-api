const { Schema, mongoose} = require ('mongoose');
const reactionSchema = require ('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use get method to convert timestamp
        get:(timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    },
    username:{
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;