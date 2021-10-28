const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    token: String
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew) this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// userSchema.methods.verify = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = model("User", userSchema);
