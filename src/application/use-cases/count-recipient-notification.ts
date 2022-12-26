import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/NotificationRepositories";
import { NotificationNotFound } from "./errrors/notification-not-found.error";

interface CountRecipientNotificationRequest {
    recipientId: string;
}

interface CountRecipientNotificationResponse {
    count: number;
};


@Injectable()
export class CountRecipientNotification {

    constructor(private readonly repo: NotificationRepository) {

    }
    async execute({ recipientId }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {

        const count = await this.repo.countManyByRecipientId(recipientId);

        return {
            count
        }

    }
}