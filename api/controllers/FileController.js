/**
 * FileController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */
var _ = require('lodash');

module.exports = {

    upload: function (req, res) {

        var attachments = req.files.attachment;

        if (_.isObject(attachments)) {
            attachments = [attachments];
        }

        var fs = require('fs');

        if (attachments.length > sails.config.files.limit) {
            return res.json({
                error: res.__('TOO_MANY_UPLOADS')
            }, 400);
        }

        for (var i=0; i<attachments.length; i++) {
            var attachment = attachments[i];

            if (attachment.size > sails.config.files.maxSize) {
                return res.json({
                    error: res.__('UPLOAD_EXCEEDS_MAX_SIZE')
                }, 400);
            }

            var ext = attachment.name.split('.');
            var strippedName = ext[0];
            ext = ext[ext.length - 1];

            if (sails.config.files.types.indexOf(ext) === false) {
                return res.json({
                    error: res.__('INVALID_FILE_EXTENSION', ext)
                }, 400);
            }

            var file = fs.readFileSync(attachment.path);

            var ext = attachment.name.split('.');
            ext = ext[ext.length - 1];

            var attachmentName = strippedName + '-' + new Date().getTime() + '.' + ext;

            
            fs.writeFile('uploads/attachments/' + attachmentName, file, function (error) {

                if (error) {
                    return res.json({
                        error: error
                    }, 500);
                }

                Attachment.create({
                    post: null,
                    name: attachmentName,
                    fileName: attachment.name,
                    size: attachment.size,
                    mime: ext
                }).exec(function (error, attachment) {
                    if (error) {
                        return res.json({
                            error: error
                        }, 500);
                    }

                    return res.json({
                        error: false,
                        attachment: attachment
                    }, 200);

                });
            });
            
        }

    }

};
