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
    const tag = await Tag.findOne({ name: req.params.tag }).populate("user");

    if (!tag) {
      return res.status(404).json({ msg: "Tag not found" });
    }
    const posts = await Post.find({ tags: tag._id })
      .sort({ date: -1 })
      .populate("tags", ["name"]);

    if (!posts) {
      return res.status(404).json({ msg: "No post found with that tag" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err);
    screen.status(500).send("Server error");
  }
});

module.exports = router;
