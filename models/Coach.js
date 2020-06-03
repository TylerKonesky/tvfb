const mongoose = require('mongoose');
const { Schema } = mongoose;

const coachSchema = new Schema({
    name: String,
    position: String,
    image: String,
    bio: String



    
})

mongoose.model('coaches', coachSchema);