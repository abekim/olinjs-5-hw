
/*
 * GET home page.
 */
var models = require('../models/models');

exports.index = function (req, res, next) {
  req.facebook.api('/me', function(err, user) { ///picture?redirect=false&type=large

    var currentUser = models.User.find({ userId: user.id }).exec(function(err, docs) {
      if (err)
        return console.log("error while looking up user", err);
      if (!docs.length) { //if user doesn't already exist
        //create new configuration
        var newConfig = new models.Config({ bgcolor: 'white', textsize: 'medium' });
        
        newConfig.save(function(err) {
          if (err)
            return console.log("error while saving user configuration");
          console.log("created a new user configuration");
        });

        //create new user
        var newUser = new models.User({ userId: user.id
          , name: user.name
          , first_name: user.first_name
          , last_name: user.last_name
          , _config: newConfig._id 
        });

        newUser.save(function(err) {
          if (err)
            return console.log("error while saving new user");
          console.log("created new user");
        });

      }
      req.facebook.api('/me/picture?redirect=false&type=large', function(err, data) {
        if (err)
          return console.log("error while getting picture");
        models.User.find({ userId: req.facebook.user }).populate('_config').exec(function (err, docs) {
          res.render('index', { 
            title: user.name + " - Shitty MyFaceBookSpace"
            , user_name: docs[0].first_name
            , source: data.data.url
            , color: docs[0]._config.bgcolor
            , size: docs[0]._config.textsize
            , userId: req.facebook.user
          });
        });
      })
    });
  });
};

exports.bgcolor = function(req, res) {
  models.User.findOne({ userId: req.body['userId'] }).exec(function (err, doc) {
    if (err) return console.log("error while looking up user");
    models.Config.findOne({ _id: doc._config }).exec(function (err, data) {
      if (err) return console.log("error while looking up user configuration");
      data.bgcolor = req.body['color'];
      data.save(function (err) {
        if (err) return console.log("error while saving config");
      });
    });
  });
};

exports.textsize = function(req, res) {
  models.User.findOne({ userId: req.body['userId'] }).exec(function (err, doc) {
    if (err) return console.log("error while looking up user");
    models.Config.findOne({ _id: doc._config }).exec(function (err, data) {
      if (err) return console.log("error while looking up user configuration");
      data.textsize = req.body['size'];
      data.save(function (err) {
        if (err) return console.log("error while saving config");
      });
    });
  });
};