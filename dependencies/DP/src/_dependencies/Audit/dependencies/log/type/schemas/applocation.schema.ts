import mongoose from 'mongoose';
const { Schema } = mongoose;


const appLocationSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true,
        ref: "AppProfile"
    },
    appLocId: {
        type: String,
        required: true
    },
    appLocName: {
        type: String,
        required: true
    }
});

module.exports = appLocationSchema