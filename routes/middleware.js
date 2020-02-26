const Book      = require('../models/book'),
      Comment   = require('../models/comment'),
      Chart     = require('../models/chart');

const isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("back");
};

function checkOwnership(req, res, next, entity) {
    if(req.isAuthenticated()){
        entity.findById(req.params.id, function(err, foundInstance) {
            if(err) {
                console.log(err);
                res.redirect("back");
            }
            else if (!foundInstance.author.id.equals(req.user.id)){
                console.log(err);
                res.redirect("back");
            }
            else{
                next();
            }
        });
    }
    else {
        res.redirect("back");
    }
}

const checkBookOwnership = function(req, res, next) {
    // EDIT route: router.get("/books/:id/edit"
    // UPDATE route: router.put("/books/:id"
    checkOwnership(req, res, next, Book);

};

const checkChartOwnership = function(req, res, next) {
    // EDIT route: router.get("/vis/:id/edit"
    // UPDATE route: router.put("/vis/:id"
    checkOwnership(req, res, next, Chart);

};

const checkCommentOwnership = function(req, res, next) {
    // EDIT route: router.get("/vis/:visId/comments/:id/edit"
    // UPDATE route: router.put("/vis/:visId/comments/:id"
    checkOwnership(req, res, next, Comment);
};


exports.isLoggedIn              = isLoggedIn;
exports.checkBookOwnership      = checkBookOwnership;
exports.checkChartOwnership     = checkChartOwnership;
exports.checkCommentOwnership   = checkCommentOwnership;

