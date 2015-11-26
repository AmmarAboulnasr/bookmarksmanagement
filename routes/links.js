'use strict';

var express = require("express");
var Link = require("../models/link");
var Tag = require("../models/tag");
var router = express.Router();

router.post("/", function(req, res) {
  Link.addLink(req.body.title, req.body.url, req.body.tags, function(err, link) {
    if(err) res.status(400).send(err);
    Tag.addNewLinkToTags(link, function(err) {
      res.status(err? 400 : 200).send(err || null);
    });
  });  
});

router.get("/", function(req, res) {
  Link.getAllLinks(function(err, links) {
    res.status(err? 400 : 200).send(err || links);
  })

});

module.exports = router;