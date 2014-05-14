module.exports = function (req, res) {

    Forum.find().exec(function (error, forums) {
        return res.ok({
            forums: forums
        });
    });

};