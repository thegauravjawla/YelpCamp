var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all camp grounds
router.get("/", function(req, res){
    //get all the campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add new campground to db
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description
    };
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    //finds the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //show the template of campground with that id
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;