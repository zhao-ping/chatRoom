module.exports = function (app) {
    app.use('/',function (req,res,err) {
        res.render('./client/index');
    });
};
