import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/Unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [
        SendNotification,
        ReadNotification,
        UnreadNotification,
        CountRecipientNotification,
        GetRecipientNotification,
        CancelNotification
    ],
})
export class HttpModule { }
