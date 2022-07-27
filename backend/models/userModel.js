const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    id: {
        type: Number,
        required: [true, 'ID is required !']
    },

    firstName: {
        type: String,
        required: [true, 'First name is required !']
    },

    lastName: {
        type: String,
        required: [false]
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    dateOfBirth: {
        type: Date,
        required: false

    },

    mobile: {
        type: Number,
        required: false

    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    accountType: {
        type: String,
        required: [true, 'Account type is required']
    }


})

const User = mongoose.model("User", userSchema);

module.exports = User;

