const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    position: String,
    image: Blob,
    bio: String



    
})

mongoose.model('users', userSchema);