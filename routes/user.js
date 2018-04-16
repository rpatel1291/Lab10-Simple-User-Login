const router = require("express").Router();
const userData = require("../data").userData;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.json());

let usernameInput = "";
let passwordInput = "";


router.get("/", function(request, response, next) {
    if (request.cookies.AuthCookie) {
        response.status(200).redirect('/private');
    } else {
        response.status(200).render("login/form", { message: "" });
    }
});

router.post("/login", function(request, response, next) {
    usernameInput = request.body.username;
    passwordInput = request.body.password;

    if (usernameInput === "" || passwordInput === "") {
        respose.status(403).render("login/form", { message: "Invalid Username or Password." });
    }
    if (userData.authenticateUser(usernameInput, passwordInput)) {
        let user = userData.getUserInfo(usernameInput);
        response.cookie('AuthCookie', usernameInput, { maxAge: 36000 });
        response.status(200).render("/private", {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            profession: user.profession,
            bio: user.bio
        });

    }

});


router.get("/private", function(request, response, next) {
    if (!request.cookies.AuthCookie) {
        response.status(403).render("login/form", { message: "User not logged in." });
    } else {
        let user = userData.getUserInfo(request.cookie.AuthCookie);
        response.status(200).render("/private", {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            profession: user.profession,
            bio: user.bio
        });
    }
});



router.get("/logout", function(request, response, next) {
    response.clearCookie("AuthCookie");
    response.status(200).render("login/logout");
});

module.exports = router;