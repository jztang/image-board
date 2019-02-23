var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

// Virtual for user's URL
UserSchema
.virtual("url")
.get(function() {
    return "/user/" + this.name;
});

module.exports = mongoose.model("User", UserSchema);