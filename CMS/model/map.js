const { Schema, model } = require("mongoose");

const mapSchema = new Schema(
  {
    title: String,
    lat: Number,
    lng: Number,
  },
  {
    timestamps: true,
  }
);

mapSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
};

module.exports = model("Map", mapSchema);
