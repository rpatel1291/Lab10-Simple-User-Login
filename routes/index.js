const userRouter = require("./user");

const constructorMethod = app => {

    app.use('/', userRouter);
    app.use('*', (req, res) => {
        res.redirect("/");
    });

};

module.exports = constructorMethod;