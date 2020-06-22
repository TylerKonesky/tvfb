// const mongoose = require('mongoose')
// const requireLogin = require('../middlewares/requireLogin');
// const requireAdmin = require('../middlewares/requireAdmin');

// const Coach = mongoose.model('coaches')
// module.exports = (app) => {
//     app.get('/api/getCoaches', async (req, res)=>{
//         try{
//             const allCoaches = await Coach.find();
//             res.send(allCoaches)
//         }catch(err){
//             res.status(401).send(err)
//         }
//     })

//     app.get('/api/storeURL', async (req, res) =>{
//         try{

//         }catch(err){

//         }
//     })

//     app.put('/api/storeURL/update', requireLogin, requireAdmin, async(req, res) =>{
//         try{

//         }catch(err){
            
//         }
//     })

 
// }