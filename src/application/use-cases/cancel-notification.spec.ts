import { makeNotification } from "@test/factories/notification.factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errrors/notification-not-found.error";


describe('Read notification', () => {
    it('should be able to Read a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);
        const notification = makeNotification()

        await notificationRepository.create(notification);
        await cancelNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    })

    it('should not be able to Read a non existing notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);


        expect(async () => {
            return await cancelNotification.execute({ notificationId: "123456" })
        }).rejects.toThrow(NotificationNotFound);
    })
})