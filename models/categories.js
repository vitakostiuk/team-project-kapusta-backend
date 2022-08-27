const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: "expenses"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false, timestamps: true }
);

const Category = model("categories", categorySchema);

module.exports = {
  Category,
};
