const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    event: String,
    date: Date,
    time: String,
    location: String,
    description: String,
    opponent: {type: String, default: null},
    score: {type: String, default: null},
    result: {type: String, default: null},
    summary: {type: String, default: null},
    mvp: {type: String, default: null},
    highlights: {type: String, default: null}
    
})

mongoose.model('events', eventSchema);