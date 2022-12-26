import { Notification } from "@application/entities/notification";

export class NotificationViewModel {
    static toHTTP({ id, category, content, createdAt, recipientId, readAt, canceledAt }: Notification) {
        return {
            id,
            category,
            content: content.value,
            createdAt,
            recipientId,
            readAt,
            canceledAt
        }
    }
}