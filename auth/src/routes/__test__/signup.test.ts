import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test11@test.com',
        password: 'testpassword11'
    })
    .expect(201);
})

it('returns 400 on invalid email', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test',
        password: 'testpassword11'
    })
    .expect(400);
});

it('returns 400 on invalid password', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test',
        password: '1'
    })
    .expect(400);
});

it('returns 400 on missing email and password', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test10@test.com',
        password: 'testpassword10'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test10@test.com',
        password: 'testpassword10'
    })
    .expect(400);
    
});

it('sets a cookie after succesful sign up', async () => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test11@test.com',
        password: 'testpassword11'
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})