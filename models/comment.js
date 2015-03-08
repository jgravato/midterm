var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//*****Create and export the Comment Schema
var CommentSchema = new Schema({
    name: {type:String },
    uniqueID: { type:String },
	comment: { type: String },
	timestamp: { type: Date, 'default': Date.now }
});
	
module.exports = mongoose.model('Comment', CommentSchema);