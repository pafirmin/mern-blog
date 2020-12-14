const express = require("express");
const router = express.Router();
const Tag = require("../../models/Tag");
const Post = require("../../models/Post");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: +1 });
    res.json(tags);
  } catch (err) {
    console.error(err);
    screen.status(500).send("Server error");
  }
});

// Get all posts with specific tag
router.get("/posts/:tag", async (req, res) => {
  try {
    const tag = await Tag.findOne({ name: req.params.tag }).populate("user");

    if (!tag) {
      return res.status(404).json({ errors: [{ msg: "Tag not found" }] });
    }
    const posts = await Post.find({ tags: tag._id })
      .sort({ date: -1 })
      .populate("tags", ["name"]);

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "No posts found with that tag" }] });
    }
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

//Get popular tags
router.get("/popular/", async (req, res) => {
  try {
    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "tags",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: { $size: "$posts" },
        },
      },
    ])
      .sort({ count: -1 })
      .limit(10);

    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;
