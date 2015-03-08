//pull in our controllers
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports.initialize = function(app, router) {
	//handles browser requests for images
	app.get('/', home.index);
	app.get('/images/:image_id', image.index);

	//handles post routes (like a form submission)
	app.post('/images', image.create);
	app.post('/images/:image_id/like', image.like);
	app.post('/images/:image_id/comment', image.comment);
	
	app.use('/', router);
};