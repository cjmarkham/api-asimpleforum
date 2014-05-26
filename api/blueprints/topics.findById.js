module.exports = function (req, res) {

    Topic.findOneById(req.param('id')).exec(function (error, topic) {
        return res.ok({
            topic: topic
        });
    });

};