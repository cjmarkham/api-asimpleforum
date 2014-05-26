module.exports = function (req, res) {
    var id = req.param('id');

    Forum.findOneById(id).exec(function (error, forum) {
        
        Topic.find({
            forum: forum.id
        })
        .exec(function (error, topics) {
            forum.topics = [];

            for (var i in topics) {
                forum.topics.push(topics[i].id);
            }

            return res.ok({
                forum: forum
            });
        });

    });

};