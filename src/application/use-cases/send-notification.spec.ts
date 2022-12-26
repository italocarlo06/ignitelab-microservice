import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification"


describe('Send notification', () => {
    it('should be able to send notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(notificationRepository);
        await sendNotification.execute({
            category: "Social",
            recipientId: "1234546",
            content: "Você tem uma nova notificação!"
        });

        expect(notificationRepository.notifications).toHaveLength(1);
    })
})