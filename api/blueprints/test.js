module.exports = function test (req, res) {

    var limit = req.param('limit');

    User.find().limit(limit).exec(function (error, users) {
        return res.ok(users);
    });

};