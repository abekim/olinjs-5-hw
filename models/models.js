var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/myfbspace');

var userSchema = mongoose.Schema({
  userId: String,
  name: String,
  first_name: String,
  last_name: String,
  _config: { type: mongoose.Schema.Types.ObjectId, ref: 'Config' }
});

var User = mongoose.model('User', userSchema);

var configSchema = mongoose.Schema({
  bgcolor: String,
  textsize: String
});

var Config = mongoose.model('Config', configSchema);

//why does this use module.exports instead of exports? 
//http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs
exports.User = User;
exports.Config = Config;