/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	report: function (req, res) {
		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var postId = req.param('postId');
		var reason = req.param('reason');

		if (!reason) {
			return res.json({
				error: res.__('FILL_IN_ALL_FIELDS')
			}, 400);
		}

		Report.findOne({
			post: postId,
			reporter: req.user.id
		}).exec(function (error, report) {
			if (report) {
				return res.json({
					error: res.__('ALREADY_REPORTED')
				}, 400);
			}

			Report.create({
				post: postId,
				reporter: req.user.id,
				reason: reason
			}).exec(function (error) {
				if (error) {
					console.error(error);

					return res.json({
						error: res.__(error.summary)
					}, 500);
				}

				return res.json({
					message: res.__('POST_REPORTED')
				}, 200);
			});
		});
			
	},

	get: function (req, res) {
		var postId = req.param('postId');

		Post.findOneById(postId).exec(function (error, post) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				});
			}

			return res.json(post, 200);
		});
	},

	like: function (req, res) {
		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var postId = req.param('postId');

		Likes.create({
			username: req.user.username,
			post: postId
		}).exec(function (error, like) {
			if (error) {
				return res.json({
					error: error.summary
				}, 500);
			}

			return res.json({
				error: false
			});
		})
	},

	save: function (req, res) {
		var postId = req.param('postId');
		var content = req.param('content');

		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		Post.findOneById(postId).exec(function (error, post) {

			if (req.user.id !== post.author) {
				return res.json({
					error: res.__('ONLY_EDIT_OWN_POST')
				}, 403);
			}

			var marked = require('marked');

			var raw = content;
			content = marked(content);

			Edits.create({
				postId: post.id,
				user: req.user.id,
				old: post.content
			}).exec(function (error) {
				Post.update({
					id: postId
				}, {
					content: content,
					raw: raw
				}, function (error, post) {

					if (error) {
						return res.json({
							error: error
						}, 500);
					}

					return res.json({
						post: post[0],
						message: res.__('POST_UPDATED')
					}, 200);
				});
			});

		});

	},

	create: function (req, res) {
		var name = req.param('name');
		var content = req.param('content');

		var topicId = req.param('topic');
		var forumId = req.param('forum');

		var quoted = req.param('quoted');

		var attachments = req.param('attachments-list');

		if (!forumId || !topicId) {
			return res.send(500);
		}

		if (!content) {
			return res.json({
				error: 'Please fill in all fields'
			}, 400);
		}

		if (!req.user) {
			return res.json({
				error: 'You must be logged in.'
			}, 403);
		}

		Topic.findOneById(topicId).exec(function (error, topic) {

			if (!name) {
				name = 'RE: ' + topic.name;
			}

			return PostService.create({
				res: res,
				req: req,
				topic: topic,
				name: name,
				content: content,
				attachments: attachments,
				quoted: quoted
			});

		});
	}

};
