'use strict';

var mongoose = require("mongoose");
var Link = require("./link");
var Schema = mongoose.Schema;

var Tag;

var tagSchema = Schema({
  name: { type: String, required: true, unique: true },
  links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  timeCreated: { type: Date, default: new Date() }
});

tagSchema.statics.addTag = function(tagName, cb) {
  var newTag = new Tag();
  newTag.name = tagName;
  newTag.save(function(err, savedTag) {
    cb(err, savedTag);
  });
};

tagSchema.statics.addTagWithLink = function(tagName, linkId, cb) {
  var newTag = new Tag();
  newTag.name = tagName;
  newTag.links.push(linkId);
  newTag.save(function(err, savedTag) {
    cb(err, savedTag);
  });
};

tagSchema.statics.updateTagName = function(tagName, newTagName, cb) {
  Tag.findOne({ name: tagName }, function(err, tag) {
    if(err || !tag) return cb(err || "No tag found.");
    tag.name = newTagName;
    tag.save(function(err, savedTag) {
      cb(err, savedTag);
    });
  });
};

tagSchema.statics.addLinkToATag = function(tagName, linkId, cb) {
  Tag.findOne({ name: tagName }, function(err, tag) {
    if(err || !tag) return cb(err || "No tag found.");
    tag.links.push(linkId);
    tag.save(function(err, savedTag) {
      cb(err, savedTag);
    });
  });
};

tagSchema.statics.deleteTag = function(tagName, cb) {
  Tag.findOne({ name: tagName }, function(err, tag) {
    if(err || !tag) return cb(err || "No tag found.");
    if(tag.links.length === 0) {
      Tag.remove({ _id: tag._id }, function(err) {
        cb(err);
      });
    } else {
      cb("Tag in use.");
    }
  });
};

tagSchema.statics.getAllTags = function(cb) {
  Tag.find({}, function(err, tags) {
    if(err || !tags) return cb(err || "No tags found.");
    cb(tags);
  });
};

tagSchema.statics.addNewLinkToTags = function(link, cb) {
  var tags = link.tags;
  var linkId = link._id;
  tags.forEach(function(tag) {
    Tag.findOne({ name: tag }, function(err, foundTag) {
      if(err) return cb(err);
      if(!foundTag) {
        Tag.addTagWithLink(tag, linkId, function(err, newTag) {
          if(err) return cb(err);
        });
      } else {
        Tag.addLinkToATag(tag, linkId, function(err, updatedTag) {
          if(err) return cb(err);
        });
      }
    });
  });
  cb();
};

Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;