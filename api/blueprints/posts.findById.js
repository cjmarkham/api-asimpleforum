module.exports = function (req, res) {

    Post.findOneById(req.param('id')).exec(function (error, post) {
        return res.ok({
            post: post
        });
    });

};