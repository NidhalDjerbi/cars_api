const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema(
    {
      content: {
        type: String,
        required: [false, "can't be blank"]
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      car: { type: Schema.Types.ObjectId, ref: "Car" },
    },
    { timestamps: true }
  );

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
