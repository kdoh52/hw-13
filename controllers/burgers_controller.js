// IMPORT EXPRESS AND BURGER.JS
let express = require("express");
let burger = require("../models/burger.js");

var router = express.Router();

// var exphbs = require("express-handlebars");

// // SET UP ROUTING
// let app = express();
// var PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


// // app.get("/", function(req, res) {
// //     connection.query("SELECT * FROM burgers;", function(err, data) {
// //       if (err) throw err;
  
// //       res.render("index", { burgers: data });
// //     });
// // });


// app.listen(PORT, function() {
//     console.log("Server listening on: http://localhost:" + PORT);
// });


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});
  
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.name, 0], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});
  
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne(
      {
        // devoured: req.body.devoured
        devoured: req.body.devoured
      },
      condition,
      function(result) {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
});

// EXPORT ROUTING
module.exports = router;
