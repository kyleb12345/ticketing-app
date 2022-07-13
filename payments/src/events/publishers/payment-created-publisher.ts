import { Subjects, Publisher, PaymentCreatedEvent } from '@geoscholar80/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}