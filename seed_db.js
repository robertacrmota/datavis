const mongoose = require('mongoose');
const Visualization = require('./models/visualization');
const Book = require('./models/book');

const visualizations = [
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

const books = [
    {
        title: "The Visual Display of Quantitative Information",
        author: "Edward Tufte",
        thumbnail_url: "https://images-na.ssl-images-amazon.com/images/I/41tNVlRHZNL._SX402_BO1,204,203,200_.jpg",
        url: "https://www.amazon.co.uk/Visual-Display-Quantitative-Information/dp/0961392142/?tag=kib-21",
        description: "The classic. A hugely-influential summary of precise and effective data display techniques.",
        year: 1983
    },
    {
        title: "How Charts Lie",
        author: "Alberto Cairo",
        thumbnail_url: "https://images-na.ssl-images-amazon.com/images/I/3107Hf2-DkL._SX330_BO1,204,203,200_.jpg",
        url: "https://www.amazon.co.uk/How-Charts-Lie-Getting-Information/dp/1324001569/?tag=kib-21",
        description: "How to decode and use visual information, examining contemporary data.",
        year: 2019
    },
    {
        title: "Visualization Analysis and Design",
        author: "Tamara Munzner",
        thumbnail_url: "https://images-na.ssl-images-amazon.com/images/I/615iwKBXgnL._SX403_BO1,204,203,200_.jpg",
        url: "https://www.amazon.co.uk/Visualization-Analysis-Design-AK-Peters/dp/1466508914/?tag=kib-21",
        description: "A systematic, comprehensive framework for thinking about visualization.",
        year: 2014
    },
    {
        title: "The Functional Art",
        author: "Alberto Cairo",
        thumbnail_url: "https://images-na.ssl-images-amazon.com/images/I/41caDbI6ktL._SX386_BO1,204,203,200_.jpg",
        url: "https://www.amazon.com/gp/product/0321834739/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=visuacinna-20&creative=9325&linkCode=as2&creativeASIN=0321834739&linkId=457257dbd788f7b4135df20aa642b1b0",
        description: "How to use data visualization as a tool to see beyond lists of numbers and variables.",
        year: 2011
    },
    {
        title: "Information Visualization: Perception for Design",
        author: "Colin Ware",
        thumbnail_url: "https://images-na.ssl-images-amazon.com/images/I/51JfqnPe6rL._SX351_BO1,204,203,200_.jpg",
        url: "https://www.amazon.com/Information-Visualization-Perception-Interactive-Technologies/dp/0128128755/ref=dp_ob_title_bk",
        description: "Based on the science of perception and vision, the book presents the key vis principles for improved clarity, utility, and persuasiveness.",
        year: 2020
    },
];

const seed = () => {

    // books
    Book.deleteMany({}, err => {
        if (err) {console.log(err);}
        else {
            console.log("successfully deleted all book documents!");
            Book.insertMany(books, err => {
                if (err) { console.log (err);}
                else {
                    console.log("successfully created book documents!");
                }
            });
        }
    });


    // visualizations
    Visualization.deleteMany({}, err => {
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
};

module.exports = seed;
