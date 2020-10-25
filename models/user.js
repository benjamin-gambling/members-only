const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, minlength: 2, required: true },
  lastname: { type: String, minlength: 2, required: true },
  username: { type: String, minlength: 5, required: true },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true },
  member: { type: Boolean, required: true },
  admin: { type: Boolean, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

module.exports = mongoose.model("User", UserSchema);
