const mongoose = require("mongoose");
Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = Tag = mongoose.model("tag", TagSchema);
