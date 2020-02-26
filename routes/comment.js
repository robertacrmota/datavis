const express = require('express');
const Comment = require('../models/comment'),
      Chart   = require('../models/chart');
const {isLoggedIn, checkCommentOwnership} = require('./middleware');

const router = express.Router({mergeParams: true});

// base route: "/vis/:visId/comments"

// CREATE - create new comment, then redirect somewhere
router.post('/', isLoggedIn, (req, res) => {
    console.log(req.user);
    const author = { id: req.user._id, username: req.user.username };
    const comment = Object.assign(req.body, { author });

    Chart.findById(req.params.visId)
        .catch(err => {console.log(err); res.redirect('back');})
        .then( vis => Comment.create(comment)
                    .catch(err => {console.log(err); res.redirect("back"); })
                    .then(newComment => {
                        console.log("Created new comment:");
                        console.log(newComment);
                        vis.comments.push(newComment._id);
                        return vis.save();
                    })
        )
        .catch(err => {console.log(err); res.redirect('back');})
        .then(() => res.redirect(`/vis/${req.params.visId}`));
});

module.exports = router;