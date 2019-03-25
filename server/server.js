import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './route';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', route);

app.listen(port);
console.log(`App running on ${port}`);

app.get('/', (req, res) => {
  res.send('Welcome to our SMS API');
})
