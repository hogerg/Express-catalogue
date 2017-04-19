var mongoose = require('mongoose').set('debug',true);
mongoose.connect('mongodb://localhost/U1C1YX');

module.exports = mongoose;