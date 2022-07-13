//publisher emits event to NATS
import { Publisher, Subjects, TicketCreatedEvent } from '@geoscholar80/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}