const router = require('express').Router();

//importing functions from user controller
const {
    getAllUsers,
    getSingleUserById,
    postNewUser,
    updateUserById,
    deleteUserById,
    postNewFriend,
    deleteFriend
} = require('../../controllers/userController');

//get and post route for /api/user
router.route('/').get(getAllUsers).post(postNewUser);

//get, put, and delete route for /api/users/:userId
router.route('/:userId').get(getSingleUserById).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(postNewFriend).delete(deleteFriend);
module.exports = router;