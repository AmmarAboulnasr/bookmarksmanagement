'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Link;

var linkSchema = Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  tags: [{ type: String, required: true }],
  timeCreated: { type: Date, default: new Date() }
});

linkSchema.statics.addLink = function(title, url, tags, cb) {
  var newLink = new Link();
  newLink.title = title;
  newLink.url = url;
  newLink.tags = tags.split(",");
  newLink.save(function(err, savedLink) {
    cb(err, savedLink);
  });
};

linkSchema.statics.getAllLinks = function(cb) {
  Link.find({}, function(err, links) {
    if(err || !links) return cb(err || "No links found.");
    cb(links);
  });
};

Link = mongoose.model("Link", linkSchema);

module.exports = Link;