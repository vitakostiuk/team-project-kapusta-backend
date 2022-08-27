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
            required: true,
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

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
};
