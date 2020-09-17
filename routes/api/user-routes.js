const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    // GET all users
    .get(getAllUsers)
    // POST a new user:
    .post(createUser);

router
    .route('/:id')
    // GET a single user by its _id and populated thought and friend data
    .get(getUserById)
    // PUT to update a user by its _id
    .put(updateUser)
    // DELETE to remove user by its _id
    .delete(deleteUser)

router
    // POST to add a new friend to a user's friend list; DELETE to remove
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;