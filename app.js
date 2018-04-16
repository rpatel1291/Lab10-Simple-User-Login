const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");


const app = express(); //Create express instance

const static = express.static(__dirname + '/public');

const configRoutes = require("./routes");

app.use('/public', static);
app.use(cookieParser());
app.use(bodyParser.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);


//Navigate to localhost
app.listen(3000, function() {
    console.log("Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it");

    if (process && process.send) process.send({ done: true }); // ADD THIS LINE
});