import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "src/application/repositories/NotificationRepositories";

export class InMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = []

    async findById(id: string): Promise<Notification> {
        const notification = this.notifications.find(item => item.id === id)

        if (!notification) {
            return null;
        }

        return notification;
    }

    async getManyByRecipientId(recipientId: string): Promise<Notification[] | null> {
        const notificationsByRecipient = this.notifications.filter(item => item.recipientId === recipientId);

        return notificationsByRecipient;
    }
    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(item => item.recipientId === recipientId).length;
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(item => item.id === notification.id);
        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }

    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }

}