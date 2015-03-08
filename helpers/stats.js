var Models = require('../models'),
    async = require('async');

module.exports = function (viewModel, callback) {
    async.parallel([
        function (next) {
            Models.Image.count({}, next);
        },
        function (next) {
            Models.Comment.count({}, next);

        },
        function (next) {
            Models.Image.aggregate({
                $group: {
                    _id: '1',
                    viewsTotal: {
                        $sum: '$views'
                    }
                }
            }, function (err, result) {
                var viewsTotal = 0;
                if (result.length > 0) {
                    viewsTotal += result[0].viewsTotal;
                }
                next(null, viewsTotal);
            });
        },
        function (next) {
            Models.Image.aggregate({
                $group: {
                    _id: '1',
                    likesTotal: {
                        $sum: '$likes'
                    }
                }
            }, function (err, result) {
                var likesTotal = 0;
                if (result.length > 0) {
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], function (err, results) {
        viewModel.sidebar.stats = {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        };
        callback(viewModel);
    });
};