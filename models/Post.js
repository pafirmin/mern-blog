const paginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: mongoose.Schema.ObjectId,
      ref: "tag",
    },
  ],
});

PostSchema.plugin(paginate);

module.exports = Post = mongoose.model("post", PostSchema);
