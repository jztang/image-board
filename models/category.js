var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
    name: {type: String, required: true}
});

// Virtual for category's URL
CategorySchema
.virtual("url")
.get(function() {
    return "/category/" + this.name;
});

module.exports = mongoose.model("Category", CategorySchema);