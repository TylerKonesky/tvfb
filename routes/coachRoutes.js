module.exports = (app) => {
    app.post('/api/addNewCoach', (req, res) =>{
        res.status(200).send(req.body.base64String)
    })
}