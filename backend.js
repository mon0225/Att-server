const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const session      = require("express-session");
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");
const cors         = require("cors")
    

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/aat-server', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express();


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true
}));

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DB || 'mongodb://mon0225:nihaoma0225@ds251889.mlab.com:51889/att-client', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

app.use(flash());
require('./passport')(app);


app.use('/auth', require('./routes/auth'));

const routes = require('./routes/watson');
app.use('/watson', routes);

app.use('/workers', require('./routes/checkUser'))

app.use('/private', require('./routes/checkUser'))






const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`listen on ${PORT}`))

module.exports = app;
