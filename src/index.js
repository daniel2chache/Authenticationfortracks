require('./models/User');
const  express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require ('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);

mongoose.connect("mongodb://localhost:27017/testTracker", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

 mongoose.connection.on('connected', ()=> {
     console.log('connected to mongo instance');
 });

 mongoose.connection.on ('error', (err)=>{
     console.error('error connecting to mongo', err );
 });

app.get('/', requireAuth, (req, res)=> {
    res.send (`your email: ${req.user.email}`);
});

app.listen(3000,()=> {
    console.log('listening to port 3000');
})