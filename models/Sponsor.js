const mongoose = require('mongoose');
const { Schema } = mongoose;

const sponsorSchema = new Schema({
    company: {type: String, default: null},
    image: {type: String, default: null},
    location: {type: String, default: null},
    description: {type: String, default: null},
    promoCode: {type: String, default: null}
    
})

mongoose.model('sponsors', sponsorSchema);