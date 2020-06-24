const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Sponsor = mongoose.model('sponsors')
module.exports = (app) => {
    
    app.get('/api/sponsors/getAllSponsors', async (req, res) =>{
        try{
            const allSponsors = await Sponsor.find();
            res.status(200).send(allSponsors)
        }catch(err){
            res.status(422).send(err);
        }
    })
    app.get('/api/sponsors/getOneSponsor/:id', async (req, res) =>{
        try{
            const sponsor = await Sponsor.findById(req.params.id);
            res.status(200).send(sponsor)
        }catch(err){
            res.status(422).send("Sponsor not found")
        }
    })

    app.post('/api/sponsors/addNewSponsor', requireLogin, requireAdmin, async (req, res) =>{
       try{
           const newSponsor =  new Sponsor(
               req.body
           )
           const savedSponsor = await newSponsor.save();
           res.status(200).send(savedSponsor);

       }catch(err){
           res.status(422).send(err);
       }
    })

    app.put('/api/sponsors/updateSponsor', requireLogin, requireAdmin, async (req, res) =>{
        try{
            const updateSponsor = await Sponsor.findByIdAndUpdate(req.body.id, req.body);
            res.status(200).send(updateSponsor)
        }catch(err){
            res.status(422).send(err)
        }
    })

    app.delete('/api/sponsors/deleteSponsor/:id', requireLogin, requireAdmin, async (req, res) =>{
        try{
            const deleteSponsor = await Sponsor.findByIdAndDelete(req.params.id);
            res.status(200).send("Sponsor Deleted")
        }catch(err){
            res.status(422).send(err)
        }
    })

}

