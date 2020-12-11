const express = require("express");
const router = express.Router();
const Tag = require("../../models/Tag");
const Post = require("../../models/Post");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err);
    screen.status(500).send("Server error");
  }
});

// Get all posts with specific tag
router.get("/:tag", async (req, res) => {
  try {
    const tag = Tag.findOne({ name: req.params.tag });
    const posts = await Post.find({ tag: tag._id });

    if (!posts) {
      return res.status(404).json({ errors: { msg: "Tag not found" } });
    }
    res.json(posts);
  } catch (err) {
    console.error(err);
    screen.status(500).send("Server error");
  }
});

module.exports = router;
