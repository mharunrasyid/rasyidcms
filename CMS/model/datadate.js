const { Schema, model } = require("mongoose");

const dataDateSchema = new Schema(
  {
    letter: Date,
    frequency: Number
  },
  {
    timestamps: true,
  }
);

dataDateSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        ret.letter = JSON.stringify(ret.letter).split("T0").shift().slice(1);
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.id;
        delete ret.__v;
        return ret;
    }
};

module.exports = model("DataDate", dataDateSchema);
