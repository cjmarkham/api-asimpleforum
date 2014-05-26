var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

module.exports = function (req, res) {

    passport.authenticate('local', function (error, user, info) {

        if (error) {
            return res.json({
                error: error
            }, 403);
        }

        if (!user) {
            return res.json({
                error: 'No user ' + req.param('username')
            }, 403);
        }

        req.logIn(user, function (error) {
            if (error) {
                return res.json({
                    error: error
                }, 403);
            }

            return res.json(user[0], 200);
        });

    })(req, res);

};