const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    storeURL: String
    
})

mongoose.model('store', storeSchema);