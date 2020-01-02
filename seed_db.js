const mongoose = require('mongoose');
const Visualization = require('./models/visualization');


let visualizations = [
    {
        title: "from Data to Viz",
        thumbnail_url: "https://www.data-to-viz.com/img/poster/poster_mockup_croped.jpg",
        url: "https://www.data-to-viz.com/",
        description: "The 'from Data to Viz' project informs suitable graphs based on your data -- e.g. one/two/three numerical variables. It includes description and D3/R/python code for each graph."
    },
    {
        title: "Mike Bostock's Blocks",
        thumbnail_url: "https://i2.wp.com/www.jenunderwood.com/wp-content/uploads/2016/07/2016-07-04_19-38-33.png",
        url: "https://bl.ocks.org/mbostock",
        description: "Bl.ocks (pronounced “Blocks”) is a viewer for sharing code examples hosted on GitHub Gist."
    },
    {
        title: "Observable",
        thumbnail_url: "https://static.observablehq.com/assets/usecase-bi-2l.jpeg",
        url: "http://observablehq.com/?utm_source=blocks",
        description: "Observable is a notebook for visually exploring data. Live code -- code that runs automatically for instant feedback; interaction and animation included. Live data -- query data by connecting to SQL databases and HTTP APIs."
    },
    {
        title: "D3 and React — A Design Pattern for Fully Responsive Charts",
        thumbnail_url: "https://cdn-images-1.medium.com/max/1200/1*zDnLT3oYVHsvrwL2QUL_rA.png",
        url: "https://medium.com/nightingale/d3-and-react-a-design-pattern-for-responsive-charts-f77337d37ab9",
        description: "A collection of articles that explain how to build responsive D3 charts inside of React."
    }
];

let seed = () => {
    Visualization.deleteMany({}, (err) => {
        if(err) {console.log(err);}
        else {
            console.log("successfully deleted all visualization documents!");

            Visualization.insertMany(visualizations, (err) => {
                if (err) { console.log (err);}
                else {
                    console.log("successfully created visualization documents!");
                }
            });
        }
    });
}

module.exports = seed;
