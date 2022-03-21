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
            match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,
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


// { name: {mandatory},
//  email: {mandatory, valid email, unique},
//  mobile: {mandatory, valid mobile number, unique},
//   collegeId: {ObjectId, ref to college model,
//     isDeleted: {boolean, default: false}}