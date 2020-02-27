const   methodOverride          = require('method-override'),
        mongoose                = require('mongoose'),
        express                 = require('express'),
        bodyParser              = require('body-parser'),
        passport                = require("passport"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        User                    = require('./models/user');

const app = express();
const port = 3000;

// ----------------------------------------------------------------
// CONFIGS
// ----------------------------------------------------------------

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "Information used to encode/decode session data",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ----------------------------------------------------------------
// DB
// ----------------------------------------------------------------

const seed = require('./seed_db');

// set db configurations
mongoose.set('useNewUrlParser', true);

// connect db
mongoose.connect('mongodb://localhost/datavisApp')
.then(() => {
    console.log("db connection established successfully.");
    seed();
})
.catch((err) => {
    console.log("Error on db connection: " + err.message);
});

// ----------------------------------------------------------------
// RESTFUL ROUTES
// ----------------------------------------------------------------

const   BookRouter      = require('./routes/book'),
        ChartRouter     = require('./routes/chart'),
        CommentRouter   = require('./routes/comment'),
        IndexRouter     = require('./routes/index');

app.use("/", IndexRouter);
app.use("/books", BookRouter);
app.use("/vis", ChartRouter);
app.use("/vis/:visId/comments", CommentRouter);


// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

app.get('/', (req, res) => res.redirect('/vis'));

// ----------------------------------------------------------------
// SERVER LISTENER
// ----------------------------------------------------------------
app.listen(port, () => console.log(`Server app listening on port ${port}!`));







