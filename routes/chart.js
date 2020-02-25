const express = require('express');
const Chart = require('../models/chart');

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
router.get('/new', (req, res) => {
    console.log("Show new chart form.");
    res.render('../views/chart/new');
});

// CREATE - create new chart, then redirect somewhere
router.post('/', (req, res) => {
    const chart = Object.assign(req.body, {samples: []});

    Chart.create(chart, (err, chart) => {
        if (err) { console.log(err); res.redirect("back"); }
        console.log("Created new chart:");
        console.log(req.body);
        res.redirect("/vis");
    });
});

// SHOW - show information for a specific chart
router.get('/:id', (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId, (err, chart) => {
        if (err) { console.log(chart); res.redirect('back');}

        console.log("Show more info. Chart id: " + chartId);
        res.render('../views/chart/show', {chart});
    })
});

// EDIT - show edit form for a chart
router.get('/:id/edit', (req, res) => {
    const chartId = req.params.id;
    console.log("Show edit form. Chart id: " + chartId);

    Chart.findById(chartId, (err, chart) => {
        if(err) {console.log(err); res.redirect("/vis");}
        else {
            res.render("../views/chart/edit", {chart: chart});
        }
    });
});

// UPDATE - update a specific chart, then redirect somewhere
router.put('/:id', (req, res) => {
    const chartId = req.params.id;
    console.log(req.body);
    Chart.findByIdAndUpdate(chartId, req.body, (err, chart) => {
        if(err) {console.log(err); res.redirect("back");}
        else {
            console.log("Update chart. Chart id: " + chart._id);
            res.redirect("/vis");
        }
    });
});

router.put('/:id/editRef', (req, res) => {
    const chartId = req.params.id;

    Chart.findById(chartId, (err, chart) => {
        if(err) {console.log(err); res.redirect("/charts");}
        else {
            chart.samples.push(req.body);
            chart.save(err => {
                if (err) {console.log(err);}
                console.log("Update chart reference. Chart id: " + chartId);
                res.redirect(`/vis/${chart._id}`);
            });
        }
    });
});

// DELETE - delete a particular chart, then redirect somewhere
router.delete('/:id', (req, res) => {
    const chartId = req.params.id;
    console.log(`DELETE request. Chart id: ${chartId}`);

    Chart.findByIdAndDelete(chartId, err => {
        if(err) {console.log(err);}
        res.redirect("/vis");
    })
});


module.exports = router;