const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Store = mongoose.model('store')
module.exports = (app) => {
    app.get('/api/storeURL/getStore', async (req, res)=>{
        try{
            const store = await Store.find();
            res.send(store)
        }catch(err){
            res.status(401).send(err)
        }
    })

    app.post('/api/storeURL/addNewStore', requireLogin, requireAdmin, async (req, res) =>{
        try{
            const newStore = await new Store({
                storeURL: req.body.storeURL
            })
            newStore.save()
            res.status(200).send(newStore)
        }catch(err){
            res.status(422).send(err)
        }
    })

    app.put('/api/storeURL/update', requireLogin, requireAdmin, async(req, res) =>{
        console.log(req.body)
        try{
            const updateStore = await Store.findByIdAndUpdate(req.body._id, req.body);
            res.status(200).send(updateStore)       
        }catch(err){
            res.status(422).send(err)
        }
    })

 
}