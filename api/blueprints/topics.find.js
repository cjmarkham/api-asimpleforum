module.exports = function (req, res) {

    Topic.findOneById(req.param('id'))
        .populate('author')
    .exec(function (error, topic) {
        return res.ok({
            topic: topic
        });
    });

};