import { makeNotification } from "@test/factories/notification.factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotification } from "./get-recipient-notification";


describe('Get notification by Recipient', () => {
    it('should be able to list all notifications from a given RecipientId', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const getRecipientNotification = new GetRecipientNotification(notificationRepository);

        await notificationRepository.create(makeNotification({ recipientId: "1234546" }));
        await notificationRepository.create(makeNotification({ recipientId: "1234546" }));
        await notificationRepository.create(makeNotification({ recipientId: "123454" }));

        const { notifications } = await getRecipientNotification.execute({ recipientId: "1234546" });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: "1234546" }),
            expect.objectContaining({ recipientId: "1234546" }),
        ]))


    })
})