const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Coach = mongoose.model('coaches')
module.exports = (app) => {
    app.get('/api/getCoaches', async (req, res)=>{
        try{
            const allCoaches = await Coach.find();
            res.send(allCoaches)
        }catch(err){
            res.status(401).send(err)
        }
    })
    app.post('/api/addNewCoach', async (req, res) =>{
        console.log("Just making sure...")
        try{
            const newCoach = new Coach({
                name: req.body.name,
                position: req.body.position,
                bio: req.body.bio,
                image: req.body.image
            })
            await newCoach.save();
            res.send(newCoach)
        }catch(err){
            res.status(422).send(err)
        }
    })
}