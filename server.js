const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// set up sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// set up sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// inform express on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set up the route
app.use(routes);

// start the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
