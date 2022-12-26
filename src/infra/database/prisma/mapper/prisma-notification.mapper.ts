import { notification as PrismaNotification } from "@prisma/client";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            createdAt: notification.createdAt,
            recipientId: notification.recipientId,
            readAt: notification.readAt
        }
    }

    static toDomain({ canceledAt, category, content, createdAt, id, readAt, recipientId }: PrismaNotification): Notification {
        return new Notification({
            category,
            content: new Content(content),
            createdAt,
            canceledAt,
            readAt,
            recipientId
        }, id)
    }
}