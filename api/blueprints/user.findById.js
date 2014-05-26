module.exports = function (req, res) {

    var id = req.param('id');

    User.findOneById(id)
    .exec(function (error, user) {
        return res.ok({
            user: user
        });
    });

};