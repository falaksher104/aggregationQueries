const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let notesSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const user = mongoose.model("Note", notesSchema);

module.exports = user;
