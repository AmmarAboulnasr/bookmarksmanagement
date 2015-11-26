'use strict';

var express = require("express");
var Tag = require("../models/tag");
var router = express.Router();

router.post("/", function(req, res) {
  Tag.addTag(req.body.tagName, function(err, tag){
    res.status(err? 400 : 200).send(err || tag);
  });
});

router.put("/", function(req, res) {
  Tag.updateTagName(req.body.tagName, req.body.newTagName, function(err, tag) {
    res.status(err? 400 : 200).send(err || null);
  });
});

router.delete("/", function(req, res) {
  Tag.deleteTag(req.body.tagName, function(err) {
    res.status(err? 400 : 200).send(err || null);
  });
});

router.get("/", function(req, res) {
  Tag.getAllTags(function(err, tags) {
    res.status(err? 400 : 200).send(err || tags);
  });
});

module.exports = router;