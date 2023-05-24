const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numOfViews: {
            type: Number,
            default: 0,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        isDisLiked: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
            },
        ],
        images:[
            {
                type:String
            }
        ],
        author: {
            type: String,
            default: "admin",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", blogSchema);
