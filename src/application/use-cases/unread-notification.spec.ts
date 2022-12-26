import { makeNotification } from "@test/factories/notification.factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errrors/notification-not-found.error";
import { UnreadNotification } from "./Unread-notification";


describe('Unread notification', () => {
    it('should be able to Unread a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);
        const notification = makeNotification({ readAt: new Date() })

        await notificationRepository.create(notification);
        await unreadNotification.execute({ notificationId: notification.id });

        expect(notificationRepository.notifications[0].readAt).toBeNull();
    })

    it('should not be able to Unread a non existing notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);


        expect(async () => {
            return await unreadNotification.execute({ notificationId: "123456" })
        }).rejects.toThrow(NotificationNotFound);
    })
})