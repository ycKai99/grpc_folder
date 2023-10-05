import mongoose from 'mongoose';
const { Schema } = mongoose;


const appLogLocSchema = new mongoose.Schema({
    appLogLocId: {
        type: String,
        ref: `AppLogLoc`,
        required: true
    },
    appLocId: {
        type: String,
        required: true
    },
    logLocId: {
        type: String,
        required: true
    }

});

module.exports = appLogLocSchema