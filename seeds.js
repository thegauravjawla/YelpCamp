var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Clouds resr",
        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non fuga eos delectus tempore. Qui nisi inventore voluptatum porro, vero sint, recusandae optio possimus cumque laboriosam veritatis unde libero odit. Velit ab sunt enim, nesciunt excepturi cum ex quas obcaecati blanditiis inventore iste nisi impedit reprehenderit distinctio eligendi tenetur suscipit ut facere eaque commodi harum iusto. Eum molestias doloribus totam ipsam id. Beatae reprehenderit reiciendis quae repellat sapiente a totam harum, illum perferendis nesciunt mollitia voluptatibus expedita facilis ipsum soluta tenetur aut iusto. Odio nostrum earum praesentium itaque doloribus libero consequatur debitis eligendi ad aut at inventore labore, obcaecati iure officia."
    },
    {
        name: "Desert Skill",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non fuga eos delectus tempore. Qui nisi inventore voluptatum porro, vero sint, recusandae optio possimus cumque laboriosam veritatis unde libero odit. Velit ab sunt enim, nesciunt excepturi cum ex quas obcaecati blanditiis inventore iste nisi impedit reprehenderit distinctio eligendi tenetur suscipit ut facere eaque commodi harum iusto. Eum molestias doloribus totam ipsam id. Beatae reprehenderit reiciendis quae repellat sapiente a totam harum, illum perferendis nesciunt mollitia voluptatibus expedita facilis ipsum soluta tenetur aut iusto. Odio nostrum earum praesentium itaque doloribus libero consequatur debitis eligendi ad aut at inventore labore, obcaecati iure officia."
    },
    {
        name: "Kenyan Glorerr",
        image: "https://images.unsplash.com/photo-1576949223184-431f5c6eb29b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non fuga eos delectus tempore. Qui nisi inventore voluptatum porro, vero sint, recusandae optio possimus cumque laboriosam veritatis unde libero odit. Velit ab sunt enim, nesciunt excepturi cum ex quas obcaecati blanditiis inventore iste nisi impedit reprehenderit distinctio eligendi tenetur suscipit ut facere eaque commodi harum iusto. Eum molestias doloribus totam ipsam id. Beatae reprehenderit reiciendis quae repellat sapiente a totam harum, illum perferendis nesciunt mollitia voluptatibus expedita facilis ipsum soluta tenetur aut iusto. Odio nostrum earum praesentium itaque doloribus libero consequatur debitis eligendi ad aut at inventore labore, obcaecati iure officia."
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