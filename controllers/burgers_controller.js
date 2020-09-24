// IMPORT EXPRESS AND BURGER.JS
let express = require("express");
let model = require("../models/burger.js");

var exphbs = require("express-handlebars");

// SET UP ROUTING
let app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// app.get("/", function(req, res) {
//     connection.query("SELECT * FROM burgers;", function(err, data) {
//       if (err) throw err;
  
//       res.render("index", { burgers: data });
//     });
// });


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});


// EXPORT ROUTING