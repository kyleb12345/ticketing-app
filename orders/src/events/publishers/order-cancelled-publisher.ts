import { Subjects, Publisher, OrderCancelledEvent } from '@geoscholar80/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}