module.exports.routes = {

	'get /forums': {
		blueprint: 'forums.find',
		cors: {
			origin: 'http://127.0.0.1:8000'
		}
	},

    'get /forums/:id': {
        blueprint: 'forums.view',
        cors: {
            origin: 'http://127.0.0.1:8000'
        }
    },

    'get /topics': {
        blueprint: 'topics.findByForum',
        cors: {
            origin: 'http://127.0.0.1:8000'
        }
    },

    'get /topics/:id': {
        blueprint: 'topics.findById',
        cors: {
            origin: 'http://127.0.0.1:8000'
        }
    },
    'get /posts/:id': {
        blueprint: 'posts.findById',
        cors: {
            origin: 'http://127.0.0.1:8000'
        }
    },

    'get /users/:id': {
        blueprint: 'user.findById',
        cors: {
            origin: 'http://127.0.0.1:8000'
        }
    },

    'post /login': {
        blueprint: 'auth.login'
    }
	
};