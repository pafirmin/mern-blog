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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let tags = req.body.tags;
      if (tags) {
        tags = await Promise.all(
          req.body.tags.map(async (tagName) => {
            const formattedName = kebabCase(tagName.toLowerCase());
            // Find tag and create new one if it doesn't exist
            let tag = await Tag.findOneAndUpdate(
              { name: formattedName },
              { $setOnInsert: { name: formattedName } },
              { upsert: true, new: true }
            );
            return tag;
          })
        );
      }

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
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("tags", ["name"]);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get posts by page
router.get("/page/:pageNumber", async (req, res) => {
  try {
    const posts = await Post.paginate(
      {},
      {
        page: req.params.pageNumber,
        populate: ["tags", "user"],
        limit: 5,
        sort: { date: -1 },
      }
    );

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("tags", ["name"])
      .populate("user");

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
router.delete("/:id", auth, async (req, res) => {
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

// Post a comment
router.post(
  "/:id/comments",
  [
    check("name", "Please enter a name").trim().escape().not().isEmpty(),
    check("text", "Comment must be at least 5 characters").trim().isLength(5),
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

      post.comments.push(comment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id/comments/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    await comment.delete();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
