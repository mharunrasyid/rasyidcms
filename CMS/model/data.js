const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const dataSchema = new Schema(
  {
    letter: String,
    frequency: Number
  },
  {
    timestamps: true,
  }
);

dataSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.id;
        delete ret.__v;
        return ret;
    }
};

module.exports = model("Data", dataSchema);
