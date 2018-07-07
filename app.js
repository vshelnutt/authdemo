const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      LocalStrategy         = require('passport-local'),
      User                  = require ('./models/user'),
      passportLocalMongoose = require('passport-local-mongoose');
      mongoose.connect('mongodb://localhost/auth_demo_app');
      
      
let app = express();
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  app.use(require('express-session')({
          secret: "sure bro",
          resave: false,
          saveUninitialized: false
          }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get("/secret", (req, res) => {
    res.render('secret');
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("server started.......");
})
