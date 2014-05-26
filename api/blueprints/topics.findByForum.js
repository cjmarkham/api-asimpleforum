module.exports = function (req, res) {

    var ids = req.query.ids;

    Topic.find({id: ids}).exec(function (error, topics) {
        return res.ok({
            topics: topics
        });
    });

};