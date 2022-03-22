const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const CreateIntern = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,  //+ = valid character for email
                "Please fill a valid email address",
            ],
        },
        mobile: {
            type: Number,
            trim: true,
            unique: true,
            match: [/^([+]\d{2})?\d{10}$/, "please fill a valid mobile Number"],
            minLength: 10,
            maxLength: 10
        },

        collegeId: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: "College",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Intern", CreateIntern);

