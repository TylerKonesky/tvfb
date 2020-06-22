const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


require('./models/Coach');
require('./models/Event');
require('./models/Sponsor');
require('./models/Store');
require('./models/User');

require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json({limit: "50mb"}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app)
require('./routes/coachRoutes')(app)
require('./routes/eventRoutes')(app)
require('./routes/storeRoutes')(app)
require('./routes/sponsorRoutes')(app)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`app is listening on port ${PORT}`))