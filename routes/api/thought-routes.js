const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller')

router
    .route('/')
    // GET to get all thoughts
    .get(getAllThoughts)
    // POST to create a new thought
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    // PUT to update a thought by its _id
    .put(updateThought)
    DELETE to remove a thought by its _id
    .delete(deleteThought)

router
    // POST to create a reaction stored in a single thought's reactions array field
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;