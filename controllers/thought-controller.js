const {
    Thought,
    User
} = require('../models');

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // GET thought by _id
    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.id
            })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    // Create thought
    createThought({
        params,
        body
    }, res) {
        Thought.create(body)
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    _id: params.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this Id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Add reaction
    addReaction({
        params,
        body
    }, res) {
        Thought.findOneandUpdate({
                id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thought with this ID!'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // Delete Reaction
    removeReaction({
        params
    }, res) {
        Thought.findOneandUpdate({
                _id: params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
            }, {
                new: true
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // Update thought by _id
    updateThought({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                    _id: params.id
                },
                body, {
                    new: true,
                    runValidators: true
                }
            )
            .then(updatedThought => {
                if (!updatedThought) {
                    return res.status(404).json({
                        message: 'No thought with this ID!'
                    });
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },

    // Delete thought by _id
    deleteThought({
        params,
        body
    }, res) {
        Thought.findOneAndDelete({
                _id: params.id
            })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({
                        message: 'No thought with this ID!'
                    })
                }
                res.json(deletedThought);
            })
            .catch(err => res.json(err));
    }
};


module.exports = thoughtController