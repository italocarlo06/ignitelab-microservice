import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/NotificationRepositories";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mapper/prisma-notification.mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {

    constructor(private readonly prismaService: PrismaService) {

    }

    async findById(id: string): Promise<Notification | null> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id
            }
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async getManyByRecipientId(recipientId: string): Promise<Notification[] | null> {
        const notifications = await this.prismaService.notification.findMany({
            where: {
                recipientId
            }
        });

        if (!notifications) {
            return null;
        }

        const domainNotifications = notifications.map(PrismaNotificationMapper.toDomain);
        return domainNotifications;
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = this.prismaService.notification.count({
            where: {
                recipientId
            }
        });

        return count;
    }

    async save(notification: Notification): Promise<void> {
        const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
        await this.prismaService.notification.update({
            where: {
                id: notification.id
            },
            data: prismaNotification
        })
    }

    async create(notification: Notification): Promise<void> {
        const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
        await this.prismaService.notification.create({
            data: prismaNotification
        })
    }

}