import { Publisher, Subjects, TicketUpdatedEvent } from '@geoscholar80/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
