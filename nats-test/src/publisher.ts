import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

//stan is 'client'... NATS uses stan for some reason
//nats doesn't make use of async... do callback functions

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', async () => {
    console.log('publisher connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    try {

    await publisher.publish({
        id: '123',
        title: 'concert',
        price: 20
    });
} catch (err) {
    console.error(err);
}
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20
    // });

    // stan.publish('ticket:created', data, () => {
    //     console.log('event published');
    // });

    //event is referred to as a message in NATS

});