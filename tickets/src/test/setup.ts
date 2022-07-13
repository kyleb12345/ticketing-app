import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';


declare global {
    function signin(): string[];
    }

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
    process.env.JWTOKEN_KEYLING = 'dgsfgdfg'

    mongo = await MongoMemoryServer.create();   
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async() => {
    await mongoose.connection.close();
    if (mongo) {
        await mongo.stop();
    }
});

global.signin = () => {
    // build JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test100@test.com'
    };

    // create the JWT
    const token = jwt.sign(payload, process.env.JWTOKEN_KEYLING!);

    // build session Object { jwt: MY_JWT }
    const session = { jwt: token };

    // turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return a string thats the cookie with the encoded data
    return [`session=${base64}`];
};