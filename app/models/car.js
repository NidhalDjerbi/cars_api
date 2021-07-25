const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const { Schema } = mongoose;
const carSchema = new Schema(
    {
      name: {
        type: String,
        required: [false, "can't be blank"]
      },
      description: {
        type: String,
        required: [false, "can't be blank"]
      },
      url: {
        type: String,
        required: [false, "can't be blank"]
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
  );
carSchema.plugin( mongoosePaginate );
const CarModel = mongoose.model("Car", carSchema);

module.exports = CarModel;
