const express   = require('express');
const Chart     = require('../models/chart'),
      Comment   = require('../models/comment');
const {isLoggedIn, checkChartOwnership} = require('./middleware');

const router = express.Router({mergeParams: true});

// INDEX - list all charts
router.get('/', (req, res) => {
    Chart.find({}, (err, charts) => {
        if (err) { console.log(err); res.redirect("back");}
        else {
            res.render('../views/chart/index', {charts});
        }
    });
});

// NEW - show new chart form
router.get('/new', isLoggedIn, (req, res) => {
    res.render('../views/chart/new');
});

// CREATE - create new chart, then redirect somewhere
router.post('/', isLoggedIn, (req, res) => {
    const author = { id: req.user._id, username: req.user.username };
    const chart = Object.assign(req.body, {author, samples: [], comments: []});

    Chart.create(chart, (err, chart) => {
        if (err) { console.log(err); res.redirect("back"); }

        res.redirect("/vis");
    });
});

// SHOW - show information for a specific chart
router.get('/:id', (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId)
        .populate("comments")
        .exec((err, chart) => {
            if (err) { console.log(chart); res.redirect('back');}

            res.render('../views/chart/show', {chart});
    });
});

// EDIT - show edit form for a chart
router.get('/:id/edit', checkChartOwnership, (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId, (err, chart) => {
        if(err) {console.log(err); res.redirect("/vis");}

        res.render("../views/chart/edit", {chart: chart});
    });
});

// UPDATE - update a specific chart, then redirect somewhere
router.put('/:id', checkChartOwnership, (req, res) => {
    const chartId = req.params.id;
    Chart.findByIdAndUpdate(chartId, req.body, (err, chart) => {
        if(err) {console.log(err); res.redirect("back");}

        res.redirect("/vis");
    });
});

router.put('/:id/editRef', isLoggedIn, (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId, (err, chart) => {
        if(err) {console.log(err); res.redirect("/charts");}
        else {
            chart.samples.push(req.body);
            chart.save(err => {
                if (err) {console.log(err);}

                res.redirect(`/vis/${chart._id}`);
            });
        }
    });
});

// DELETE - delete a particular chart, then redirect somewhere
router.delete('/:id', checkChartOwnership, (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId)
        .catch(err => {console.log(err); res.redirect('back');})
        .then(vis => Comment.deleteMany({ _id: { $in: vis.comments} })
                        .catch(err => {console.log(err); res.redirect('back');})
                        .then(() => Chart.deleteOne({_id: vis._id})))
        .catch(err => {console.log(err); res.redirect('back');})
        .then(() => res.redirect("/vis"));
});


module.exports = router;