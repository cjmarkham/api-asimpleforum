exports.create = function (params) {

    var topic = params.topic;
    var res = params.res;
    var content = params.content;
    var req = params.req;
    var name = params.name;
    var attachments = params.attachments;

    var quoted = params.quoted;

    var marked = require('marked');

    var raw = content;
    content = marked(content);

    var data = {
        name: name,
        raw: raw,
        content: content,
        topic: topic.id,
        forum: topic.forum,
        author: req.user.id
    };

    if (quoted != 0) {
        data.quoted = quoted;
    }

    Post.create(data).exec(function (error, post) {
        if (error) {
            console.error(error);

            return res.json({
                error: res.__(error.summary)
            }, 500);
        }

        if (attachments) {

            attachments = attachments.split(',');

            for (var i=0; i<attachments.length; i++) {
               
                Attachment.update({
                    id: attachments[i]
                }, {
                    post: post.id
                }).exec(function (error) {

                });

            }

        }

        Forum.update({
            id: topic.forum
        }, {
            lastTopic: topic.id,
            lastPost: post.id,
            lastAuthor: req.user.id
        }).exec(function (error, forums) {
            if (error) {
                return res.json({
                    error: error
                }, 500);
            }

            topic.author = req.user;
            topic.forum = forums[0];

            Topic.publishCreate({
                id: topic.id,
                topic: topic
            });

            User.update({
                id: req.user.id
            }, {
                posts: req.user.posts + 1,
                topics: req.user.topics + 1
            }, function (error) {

                post.author = req.user;

                return res.json({
                    topic: topic,
                    post: post
                }, 200);
            });

        });
        
    });

};