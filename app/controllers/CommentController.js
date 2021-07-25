var Car = require("../models/car");
var Comment = require("../models/comment");

async function createComment(req, res) {
  const { content, user, car } = req.body;
  var comment = new Comment({
    content,
    user,
    car
  });
  try {
    comment = await comment.save()

    let car_result = await Car.findById(car)
    car_result.comments.push(comment);
    await car_result.save()
    res.json({
      success: true,
      data: comment
    });
  }catch(err){
    res.send({
      success: false,
      error: err.message
    });
  }
  
}

module.exports = {
  createComment,
};
