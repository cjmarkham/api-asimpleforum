module.exports = function (req, res) {

    Forum.find().exec(function (error, forums) {
        for (var i in forums) {
            forums[i].topics = [];
        }
        return res.ok({
            forums: forums
        });
    });

};