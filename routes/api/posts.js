const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Tag = require("../../models/Tag");
const kebabCase = require("lodash").kebabCase;

require("dotenv").config();

// Make a new post
router.post(
  "/",
  [
    auth,
    [
      check("tags.*", "Tags must be fewer than 15 characters")
        .trim()
        .escape()
        .isLength({ max: 15 }),
      check("title", "Enter a title for your post")
        .trim()
        .escape()
        .not()
        .isEmpty(),
      check("text", "Post body must not be empty")
        .trim()
        .escape()
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const tags = await Promise.all(
      req.body.tags.map(async (tagName) => {
        const formattedName = kebabCase(tagName.toLowerCase());

        let tag = await Tag.findOneAndUpdate(
          { name: formattedName },
          { $setOnInsert: { name: formattedName } },
          { upsert: true, new: true }
        );

        return tag;
      })
    );

    try {
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        user: req.user.id,
        tags: tags,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("tags.tag", ["name"]);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/:id/comments",
  [
    check("name", "Please enter a name").trim().escape().not().isEmpty(),
    check("text", "Comment must be at least 5 characters")
      .trim()
      .escape()
      .isLength(5),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.id);

      const comment = {
        name: req.body.name,
        text: req.body.text,
      };

      post.comments.unshift(comment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
