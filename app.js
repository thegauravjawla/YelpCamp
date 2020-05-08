var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var seedDB      = require("./seeds");
var flash       = require("connect-flash");
var passport    = require("passport");
var User        = require("./models/user");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);
app.use(flash());


// seedDB(); //seed the database

//passport config
app.use(require("express-session")({
    secret: "This is again just a secret string",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//it is a middleware that will run in every single route
//the function is called in every route
app.use(function(req, res, next){
    // whatever is in res.locals is available to us in all templates
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//express routers
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);

app.listen(3000, function(){ 
    console.log("YelpCamp server is live");
});