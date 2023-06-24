const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const { inflate } = require("zlib");
const db = require("./config/db");
const hbs = require("handlebars");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

//use session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET_KEY,
    // store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//Auth Google
const passport = require("passport");
// var userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
); //dư lieu từ form
app.use(express.json()); // dữ liệu từ user

//HTTP logger
app.use(morgan("combined"));

//Template
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");

// https://github.com/ericf/express-handlebars/issues/147d
app.set("views", path.join(__dirname, "resources/views"));

const route = require("./routes");
// Route init
route(app);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Nodejs port: http://localhost:%d in %s mode",
    this.address().port,
    app.settings.env
  );
});

// Connect to DB
try {
  db.connect();
  console.log("Connect database successfully!");
} catch (error) {
  console.log("Connect database fail!");
}
