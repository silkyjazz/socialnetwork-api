// const {User, Thought} = require('../models');
const User = require('../models/User');

const userControllers = {
    //function to find all users in collection
    getAllUsers(req,res){
       User.find()
       .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    
    //find a user by id

    getSingleUserById(req, res){
        User.findOneById(id)
        .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
        // .then((user) => 
        // !user
        //     ? res.status(404).json({message: 'No User Found'})
        //     : res.json(user))
        // .catch((err) => res.status(500).json(err))
    },

    //create a new user
    postNewUser(req, res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    //update a user by id

    updateUserById(req,res){
        User.findByIdAndUpdate({
            _id: req.params.userId,
            $set: req.body,
            runValidators: true, new: true
        })
        .then((user) =>
        !user ? res.status(404).json({message: 'No User Found'})
        : res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    //delete a user by id
    deleteUserById(req,res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user ? res.status(404).json({message: 'No User Found'})
        : res.status(200).json(user)
        )
    },


    //post a new friend to user's friend list
    postNewFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$addToSet: {friends: req.params.friendId}}, 
            {runValidators: true, new: true})
        .then((user) => {
            !user ? res.status(404).json({message: 'No User Found'})
            : res.status(200).json(user)
        })
        .catch((err) => res.status(500).json(err))
    },  
    //delete friend from a user's friend list
    deleteFriend(req, res){
       User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$pull: {friend: {friendId: req.params.friendId}}},
        {runValidators: true, new: true}
       ) 
       .then((user)=> 
       !user 
        ? res.status(404).json({message: 'No User Found'})
        : res.json(user))
        .catch((err) => res.status(500).json(err))
    }
};

module.exports = userControllers;