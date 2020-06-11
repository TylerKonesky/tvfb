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

    app.get('/api/coaches/getOneCoach/:id', async (req, res) =>{
        try{
            const editableCoach = await Coach.findById(req.params.id);
            res.status(200).send(editableCoach);
        }catch(err){
            res.status(422).send(err)
        }
    })

    app.put('/api/coaches/updateCoach', requireLogin, requireAdmin, async (req, res) =>{
        try{
            const updatedCoach = await Coach.findByIdAndUpdate(req.body.id, req.body);
            res.status(200).send(updatedCoach);
        }catch(err){
            res.status(422).send(err);
        }
    })

    app.post('/api/coaches/addNewCoach', requireLogin, requireAdmin, async (req, res) =>{
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
    app.delete('/api/coaches/deleteCoach/:id', requireLogin, requireAdmin, async (req, res) =>{
        try{
            const deleteCoach = await Coach.findByIdAndDelete(req.params.id);
            const remainingCoaches = await Coach.find();
            res.send(remainingCoaches);
        }catch(err){
            res.status(401).send(err);
        }
    })
}