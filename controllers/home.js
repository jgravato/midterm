//takes the browser's request and lets us send back a page or other information
var imageModel = require('../models').Image;
var stats = require('../helpers/stats');
var commentModel = require('../models').comment;

var viewModel = {
    images: {},
    sidebar: {},
    featured: {}
};


module.exports = {
    index: function (req, res) {
        //create featured item
        //count how many images there are
        imageModel.count(function (err, count) {
            //select a number at random between 0 and how many count is
            var winner = Math.floor((Math.random() * count) + 1);
            console.log(winner);
            //export image to be displayed in featured window
        })
        
        imageModel.find(function (err, images) {
            viewModel.images = images;
            stats(viewModel, function (viewModel) {
                res.render('index', viewModel);
            });
        });
    }
};