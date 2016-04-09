var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMomgoose = require("passport-local-mongoose")
    
    
mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "travel is the best",
    resave: false,
    saveUninitialized: false
}));
//seting passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========
//routes
//========

app.get("/", function(req, res){
    res.render("home");
});

// secret page
app.get("/secret",isLoggedIn, function(req, res) {
    res.render("secret");
});

//Auth Routes
//show sing uu form
app.get("/register", function(req, res) {
    res.render("register");
});

// handling sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
        
    });
});

//LOGIN routes
// render login form
app.get("/login", function(req, res) {
    res.render("login");
});

//login logic
// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res) {
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//check if is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started........");
});