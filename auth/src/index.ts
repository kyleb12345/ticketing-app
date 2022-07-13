import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
<<<<<<< HEAD
    console.log('Starting up.........');
=======
    console.log('Starting up..........');
>>>>>>> 92bc773c9abf91f1d45f639b9ee3d247329e2868

    if (!process.env.JWTOKEN_KEYLING) {
        throw new Error('JWTOKEN_KEYLING must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });    
};

start();