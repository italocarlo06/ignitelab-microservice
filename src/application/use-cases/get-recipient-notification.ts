import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/NotificationRepositories";

interface GetRecipientNotificationRequest {
    recipientId: string;
}

interface GetRecipientNotificationResponse {
    notifications: Notification[];
};


@Injectable()
export class GetRecipientNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ recipientId }: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {

        const notifications = await this.repo.getManyByRecipientId(recipientId);

        return {
            notifications
        }

    }
}