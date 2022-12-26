import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/repositories/NotificationRepositories';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService,
        {
            provide: NotificationRepository,
            useClass: PrismaNotificationsRepository
        }
    ],
    exports: [NotificationRepository]
})
export class DatabaseModule { }
