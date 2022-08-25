const express = require("express");
const cors = require("cors");
const path = require("path");
const expressLayoutes = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const config = require("./config/boostrap");
var session = require("express-session");
const err = require("./middleware/errors");
const customerRoutes = require("./routes/CustomerRoutes");
const UserRoutes = require("./routes/UserRoute");
var flash = require("express-flash");
const app = express();

require("./config/db")();

app.use(flash());
app.use(expressLayoutes);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.token;
  res.locals.message= req.session.message;
  next();
});


app.use(UserRoutes.routes);
app.use(customerRoutes.routes);
app.use(err);

app.listen(config.port, () =>
  console.log("Server started on url http://localhost:" + config.port)
);
