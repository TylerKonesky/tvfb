const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Event = mongoose.model('events')
module.exports = (app) => {
    app.get('/api/events/getAllEvents', async (req, res) =>{
        try{
            const allEvents = await Event.find();
            res.status(200).send(allEvents);
        }catch(err){
            res.status(422).send(err)
        }  
    })
    app.get('/api/events/getOneEvent/:id', async (req, res) =>{
        try{
            const oneEvent = await Event.findById(req.params.id);
            res.status(200).send(oneEvent)
        }catch(err){
            res.status(422).send(err)
        }
    })

    app.post('/api/events/addNewEvent', async (req, res) =>{
        const {event, date, location, time, description} = req.body;
        try{
            const newEvent = new Event({
                event, 
                location,
                date, 
                time,
                description
            })
            const savedEvent = await newEvent.save();
            const allEvents = await Event.find();
            res.status(200).send(allEvents)
        }catch(err){
            res.status(422).send(err)
        }
    })

    app.put('/api/events/update', async (req, res) =>{
        console.log(req.body)
       try{
        const updateEvent = await Event.findByIdAndUpdate(req.body.id, req.body)
        res.status(200).send(updateEvent)
       }catch(err){
           res.status(422).send(err)
       }
    })

    app.delete('/api/events/delete/:id', async (req, res) =>{
        try{
            const deleteEvent = await Event.findByIdAndDelete(req.params.id);
            const remainingEvents = await Event.find();
            res.status(200).send(remainingEvents)
        }catch(err){
            res.status(422).send(err)
        }
    })
}