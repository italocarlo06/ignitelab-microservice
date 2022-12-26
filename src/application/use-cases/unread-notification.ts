import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepositories";
import { NotificationNotFound } from "./errrors/notification-not-found.error";

interface UnreadNotificationRequest {
    notificationId: string;
}

type UnreadNotificationResponse = void;


@Injectable()
export class UnreadNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ notificationId }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {

        const notification = await this.repo.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.repo.save(notification);

    }
}