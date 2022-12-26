import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/NotificationRepositories";
import { NotificationNotFound } from "./errrors/notification-not-found.error";

interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;


@Injectable()
export class ReadNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ notificationId }: ReadNotificationRequest): Promise<ReadNotificationResponse> {

        const notification = await this.repo.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.repo.save(notification);

    }
}