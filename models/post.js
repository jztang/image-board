var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image_link: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    upvotes: {type: Number, required: true},
    created: {type: Date, required: true}
});

// Virtual for post's URL
PostSchema
.virtual("url")
.get(function() {
    return this._id;
});

module.exports = mongoose.model("Post", PostSchema);