const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
    {
        date: {
            day: String,
            month: String,
            year: String
        },
        description: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: 0,
        },
        income: {
            type: Boolean,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false, timestamps: true }
);

const Transaction = model("transactions", transactionSchema);

module.exports = {
  Transaction,
};
