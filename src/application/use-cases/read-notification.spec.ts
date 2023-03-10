import { makeNotification } from "@test/factories/notification.factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errrors/notification-not-found.error";
import { ReadNotification } from "./read-notification";


describe('Read notification', () => {
    it('should be able to Read a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);
        const notification = makeNotification()

        await notificationRepository.create(notification);
        await readNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date));
    })

    it('should not be able to Read a non existing notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);


        expect(async () => {
            return await readNotification.execute({ notificationId: "123456" })
        }).rejects.toThrow(NotificationNotFound);
    })
})