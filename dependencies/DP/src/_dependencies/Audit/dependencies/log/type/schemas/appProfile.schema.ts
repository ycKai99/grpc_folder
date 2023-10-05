import mongoose, { Model } from 'mongoose';
const { Schema } = mongoose;


const appProfileSchema = new mongoose.Schema({
    appId: {
        type: String,
        required: true
    },
    appName: {
        type: String,
        required: true
    }

});

module.exports = appProfileSchema
