const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TagSchema = require("./Tag");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tags: [
    {
      tag: {
        type: mongoose.Schema.ObjectId,
        ref: "tag",
      },
    },
  ],
});

module.exports = Post = mongoose.model("post", PostSchema);
