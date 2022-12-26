import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/NotificationRepositories";
import { NotificationNotFound } from "./errrors/notification-not-found.error";

interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;


@Injectable()
export class CancelNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ notificationId }: CancelNotificationRequest): Promise<CancelNotificationResponse> {

        const notification = await this.repo.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.repo.save(notification);

    }
}