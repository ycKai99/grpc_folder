import mongoose from 'mongoose';
const { Schema } = mongoose;


const logLocationSchema = new mongoose.Schema({
    logLocId: {
        type: String,
        required: true
    },
    logLocName: {
        type: String,
        required: true
    }
});

module.exports = logLocationSchema