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
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());


  app.use(require('express-session')({
          secret: "sure bro",
          resave: false,
          saveUninitialized: false
          }));
          
passport.use(new LocalStrategy(User.authenticate()));        
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=============
//ROUTES
//=============          

app.get('/', (req, res) => {
    res.render('home');
});

app.get("/secret", (req, res) => {
    res.render('secret');
});

//show sign up form
app.get('/register', (req, res) => {
    res.render('register');
});
//handle user sign up
app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect('/secret');
        });
      });
    });
    
    //LOGIN ROUTES
//render login form
app.get('/login', (req, res) => {
    res.render('login')
})
//login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: 'login'
}),  (req, res) => {
    
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("server started.......");
})
