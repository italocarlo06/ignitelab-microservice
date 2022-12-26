import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification.factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";


describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotification = new CountRecipientNotification(notificationRepository);

        await notificationRepository.create(makeNotification({ recipientId: "1234546" }));
        await notificationRepository.create(makeNotification({ recipientId: "1234546" }));
        await notificationRepository.create(makeNotification({ recipientId: "123454" }));

        const { count } = await countRecipientNotification.execute({ recipientId: "1234546" });

        expect(count).toEqual(2);
    })
})