const router = require("express").Router();
const commentController = require("../controllers/CommentController");
const Comment = require("../models/comment");

router
  .route("/")
  
  .post(commentController.createComment);
module.exports = router;
