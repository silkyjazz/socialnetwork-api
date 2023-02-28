const { Schema, mongoose } = require("mongoose");

//Schema for what makes up a user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!'],
    },
    thoughts: [
        { type: Schema.Types.ObjectId, 
            ref: 'Thought',
        },
    ],
    friends: [
        {type: Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

//Virtual that retrieves the length of user's friends 
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

//Initalize the model
const User = mongoose.model('user', userSchema);

//Exporting the user model
module.exports = User;