const mongoose  = require('mongoose');
const Chart     = require('./models/chart'),
      Book      = require('./models/book'),
      User      = require('./models/user'),
      Comment   = require('./models/comment');

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

const charts = [
    {
        type: "Chord Diagram",
        thumbnail_url: "https://i.stack.imgur.com/M9g4m.jpg",
        description: "A chord diagram is a graphical method of displaying the inter-relationships between data in a matrix. " +
            "The data is arranged radially around a circle with the relationships between the points typically drawn as arcs connecting the data together.\n\n" +
            "A Non-ribbon Chord Diagram is a stripped-down version of a Chord Diagram, with only the connection lines showing. This provides more emphasis on the connections within the data.",
        functions: ["Correlation"],
        shapes: ["Circle"],
        samples: [{
                thumbnail_url: "https://www.data-to-viz.com/graph/chord_files/figure-html/unnamed-chunk-1-1.png",
                url: "https://www.data-to-viz.com/graph/chord.html"
            },
            {
                thumbnail_url: "https://www.data-to-viz.com/graph/edge_bundling_files/figure-html/unnamed-chunk-3-1.png",
                url: "https://vega.github.io/vega/examples/edge-bundling/"
            }
        ],
        comments: []
    },
    {
        type: "Skankey Diagram",
        thumbnail_url: "https://i.redd.it/lopswoi58io21.png",
        description: "Sankey diagrams are a specific type of flow diagram, in which the width of the arrows is shown proportionally to the flow quantity. " +
                     "They put a visual emphasis on the major transfers or flows within a system, locating dominant contributions to an overall flow.",
        functions: ["Correlation"],
        shapes: ["Area", "Line"],
        samples: [{
                thumbnail_url: "https://46gyn61z4i0t1u1pnq2bbk2e-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/sankey-colors-example.jpg",
                url: "https://www.displayr.com/using-colors-effectively-in-sankey-diagrams/"
            },
            {
                thumbnail_url: "https://d2uusema5elisf.cloudfront.net/books/fullstack-d3/images/12-animated-sankey/finished.png",
                url: "https://www.newline.co/books/fullstack-d3/animated-sankey-diagram"
            },
            {
                thumbnail_url: "https://datavizproject.com/wp-content/uploads/2015/11/c7bfd13fe137965d30e266a2734eb553.jpg",
                url: "http://bldgwlf.com/density-design/"
            }
        ],
        comments: []
    },
    {
        type: "Stream Graph",
        thumbnail_url:"https://www.wired.com/magazine/wp-content/images/18-11/ff_311_newyork1b_f.jpg",
        description: "A streamgraph is a type of stacked area graph which is displaced around a central axis, resulting in a flowing, organic shape." +
                     "Stacked area charts like streamgraphs are criticized. It can be hard to read the evolution of a specific group since the reader " +
                     "has to substract the other groups in his mind. It is often better to use small multiple or line plot instead.",
        functions: ["Distribution", "Part of a whole"],
        shapes: ["Area"],
        samples: [{
            thumbnail_url: "https://datavizproject.com/wp-content/uploads/2015/11/cover_mania_0.jpg",
            url: "https://improving-visualisation.org/vis/id=112"
        }],
        comments: [{
            text: "A classic. Baby name voyager: <a href='https://www.babynamewizard.com/voyager#prefix=&sw=both&exact=false' target='_blank'>https://www.babynamewizard.com/voyager#prefix=&sw=both&exact=false</a>"
        }]
    },
    {
        type: "Countour plot",
        thumbnail_url: "http://www.idlcoyote.com/graphics_tips/contourcolors_1.png",
        description: "A Contour Plot is a graphic representation of the relationships among three numeric variables in two dimensions. " +
                    "Two variables are for X and Y axes, and a third variable Z is for contour levels. The contour levels are plotted as curves; " +
                    "the area between curves can be color coded to indicate interpolated values.",
        functions: ["Distribution"],
        shapes: ["Area"],
        samples: [{
            thumbnail_url: "https://raw.githubusercontent.com/d3/d3-contour/master/img/reprojection.png",
            url: "https://github.com/d3/d3-contour"
        }],
        comments: [{
            text: "d3 contour -- a library to compute contour polygons using marching squares. <a href='https://github.com/d3/d3-contour' target='_blank'>https://github.com/d3/d3-contour</a>"
        }]
    },
    {
        type: "Flow map",
        thumbnail_url: "https://datavizproject.com/wp-content/uploads/2015/11/Sk%C3%A6rmbillede-2017-10-20-kl.-16.39.24.png",
        description: "Flow Maps in cartography can be defined as a mix of maps and Sankey diagrams, that show the movement of quantities from one " +
            "location to another, such as the number of people travelling, the amount of goods being traded, or the number of packets in a network.\n" +
            "The width of the connections shows the quantity. Sometimes you flow maps with arrows to display the direction of the movement.\n" +
            "The most famous example of a flow map, is Minard’s map of Napoleon’s disastrous Russian campaign of 1812.",
        functions: ["Correlation", "Distribution", "Map", "Flow"],
        shapes: ["Area", "Line"],
        samples: [
            {
                thumbnail_url: "http://visualoop.com/media/2015/03/Carte-bestiaux.jpg",
                url: "http://visualoop.com/blog/31064/vintage-infodesign-112"
            },
            {
                thumbnail_url: "https://d33wubrfki0l68.cloudfront.net/eb7d693f7f1123ad2135c1ba4ddf220d87ac5692/ddd22/img/portfolio/2017/bussed-out/bussed_out_detail_1.jpg",
                url: "https://www.visualcinnamon.com/portfolio/bussed-out"
            },
            {
                thumbnail_url: "https://d33wubrfki0l68.cloudfront.net/de93338ee85ead7e23014079cbe746ac31cfc592/72e09/img/portfolio/2019/lighthouse-reports/lighthouse_reports_detail_5.png",
                url: "https://www.visualcinnamon.com/portfolio/lighthouse-reports-frontex"
            }
        ],
        comments: []
    },
    {
        type: "Spiral Histogram",
        thumbnail_url: "https://datavizproject.com/wp-content/uploads/2017/09/Sk%C3%A6rmbillede-2017-09-06-kl.-16.51.14.png",
        description: "The spiral histogram also called a condegram is a histogram but with a timeline along a spiral shape. " +
                     "The spiral design makes it possible to compare cycles, but keeping the continuous timeline along the spiral.",
        functions: ["Correlation"],
        shapes: ["Shape"],
        samples: [],
        comments: []
    },
    {
        type: "Arc diagram",
        thumbnail_url: "https://datavizproject.com/wp-content/uploads/2015/11/all_books.png",
        description: "An Arc Diagram uses a one-dimensional layout of nodes with circular arcs to represent connections. " +
                    "Nodes are placed along a single line and arcs are used to display links between the nodes. The thickness of the lines can display frequency between the nodes.",
        functions: ["Correlation"],
        shapes: ["Line", "Dot"],
        samples: [
            {
                thumbnail_url: "https://6hohzg.dm2302.livefilestore.com/y4m32SWykNrjfDcDtUeAWk-GmdTDZjkee8PawcaOpOAki8jo-SabH5ROI_EIUcUd6E6Zjww8hWlnKvspuWbBx476tl00p24aLEvDIvBRpHTZLzUvyNet8p7FowdY9bDwxsxhdFm1pwb-jerT1pYuQVh345xLtbVteIgghqSB6BZmcilZTvlum45h3MANWAhOGm0_hYibccxgAhI3LwOiCdHAw?width=2600&height=1320&cropmode=none",
                url: "http://www.datavizdoneright.com/2018/02/bussed-out.html"
            }
        ],
        comments: []
    },
    {
        type: "Beeswarm plot",
        thumbnail_url: "https://static.observableusercontent.com/thumbnail/72645707c9861b51cfe93f812176c03520c814b9163321926d4c03e96a0e468b.jpg",
        description: "The beeswarm plot is a one-dimensional scatter plot like \"stripchart\", but with closely-packed, non-overlapping points.\n" +
                     "Essentially beeswarm plot is used to visualize distributions similar to stripchart, histogram or box and whisker plot. " +
                     "The difference between beeswarm plot and other traditional chart type that visualize distributions is that beeswarm plots the data " +
                     "on the single axis and then offsets in the other direction to show volume or counts.",
        functions: ["Distribution"],
        shapes: ["Circle"],
        samples: [{
                thumbnail_url: "https://d33wubrfki0l68.cloudfront.net/b5520fc0d42fdcfc419406e77c6ac9c0537160d1/44258/img/portfolio/2017/bussed-out/bussed_out_detail_4.jpg",
                url: "https://www.visualcinnamon.com/portfolio/bussed-out"
            },
            {
                thumbnail_url: "https://lh3.googleusercontent.com/proxy/PQzIdHW76k8bXYP6MBIEVvbebdaK5SS1YW14bedSkneDC9BUo_gnnl0dXbeSSw9Ay2Xw_z69MrPMCGfHOOKH4m1olL2TLvKFSYlz8yMm6Ss2ii0edplAlQFrmyI",
                url: "http://www.datasketch.es/december/"
            }
        ],
        comments: [{
            text: "Nice plugin for a D3 Swarm plot with D3.forceChart: <a href='https://github.com/armollica/force-chart' target='_blank'>https://github.com/armollica/force-chart</a>"
        }, {
            text: "The New York Times article using beeswarm: <a href='https://archive.nytimes.com/www.nytimes.com/interactive/2013/05/25/sunday-review/corporate-taxes.html' target='_blank'>https://archive.nytimes.com/www.nytimes.com/interactive/2013/05/25/sunday-review/corporate-taxes.html</a>"
        }]
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

const seed = async () => {

    // books
    Book.deleteMany({}, err => {
        if (err) {console.log(err);}
        else {
            console.log("successfully deleted all book documents!");
            Book.insertMany(books, err => { if(err) console.log (err)});
        }
    });

    // comments
    Comment.deleteMany({}, err => {
        if (err) {console.log(err);}
        else {
            console.log("successfully deleted all comment documents!");
        }
    });

    // charts
    const userDefault = await User.findOne({username: 'roberta.cmota@gmail.com'});
    const authorDefault = { id: userDefault._id, username: userDefault.username };

    Chart.deleteMany({})
        .catch(err => console.log(err))
        .then(() => {
            console.log("successfully deleted all chart documents!");

            charts.forEach(chart => {
                chart.comments = chart.comments.map(comment => Object.assign(comment, {author: authorDefault}));

                if (chart.comments.length) {
                     Comment.create(chart.comments)
                        .catch(err => console.log(err))
                        .then(comments => {
                            chart.comments = comments.map(comment => comment._id);
                            Chart.create(chart).catch(err => console.log(err));
                        });
                }
                else {
                    Chart.create(chart).catch(err => console.log(err));
                }
            });
        });
};

module.exports = seed;
