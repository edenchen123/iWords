var mongoose = require('mongoose');

module.exports = mongoose.model('Word', {
	word : {type : String, default: ''},
	explain : {type : String, default: ''},
	type : {type : String, default: ''},
	groupId : {type : String, default: ''},
	user : {type : String, default: 'eden'},
    date:{type : Date, default: new Date()}
});