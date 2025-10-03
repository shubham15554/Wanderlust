const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("secretCode"));
const flash  = require("connect-flash");
const path = require("path");
const session = require("express-session");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOtions = {
   secret : "Mysuperseceret" , 
   resave: false , 
   saveUninitialized: true
};
// app.get("/" , (req , res) => {
//     console.dir(req.cookies)
//     res.send("hello I am root")
// })


// app.get("/getcookies" , (req , res)=> {
//     res.cookie("greet" , "hello");
//     res.send("get some cookies");
// });

// app.get("/getSignedCookies" , (req , res)=> {
//     res.cookie("hello" , "beta" ,  {signed: true});
//     res.send("get some cookies");
// });

// app.get("/verify" , (req , res)=> {
//     console.log(req.signedCookies);
//     res.send("verified");
// });


app.use(session(sessionOtions));
app.use(flash());
// app.get("/test" , (req , res)=> {
//     res.send("testing successful");
// })


// app.get("/reqcount" , (req , res)=> {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else {
//         req.session.count = 1;
//     }
//     res.send(`you have sent the request for the ${req.session.count} times`);
// });
app.use((req , res , next)=> {
    res.locals.success  = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})
app.get("/register" , (req , res) => {
    let {name = "anonymous"}  = req.query;
    req.session.name = name;
    
   
    if(name == "anonymous"){
       req.flash("error" , "user not registerd");
    }
    else{
        req.flash("success" , "user registerd successfully");
    }
    res.redirect("/hello");
});

app.get("/hello" , (req , res) => {
   
    res.render("page.ejs" , {name : req.session.name  });
})
app.listen(3000 , ()=> {
    console.log("app is listening");
})