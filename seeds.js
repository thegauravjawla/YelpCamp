var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Clouds resr",
        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "hello hello lololo XOXOXO"
    },
    {
        name: "Desert Skill",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "hello hello lololo XOXOXO"
    },
    {
        name: "Kenyan Glorerr",
        image: "https://images.unsplash.com/photo-1576949223184-431f5c6eb29b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "hello hello lololo XOXOXO"
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds");

        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    //add a few comments
                    Comment.create({
                        text: "This place is awesome but there is no washroom and wifi",
                        author: "Homer"
                    }, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;