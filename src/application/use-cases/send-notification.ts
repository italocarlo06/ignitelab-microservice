import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/NotificationRepositories";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification
}


@Injectable()
export class SendNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ recipientId, content, category }: SendNotificationRequest): Promise<SendNotificationResponse> {
        const notification = new Notification({
            recipientId,
            category,
            content: new Content(content),
        });

        await this.repo.create(notification);

        return {
            notification
        };
    }
}