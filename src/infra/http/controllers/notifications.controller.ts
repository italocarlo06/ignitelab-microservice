import { Body, Controller, Get, Injectable, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view.model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/Unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotification } from "@application/use-cases/get-recipient-notification";


@Controller("notifications")
@Injectable()
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotification: GetRecipientNotification
  ) { }

  @Patch(':id/cancel/')
  async cancel(
    @Param("id") notificationId: string
  ) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(
    @Param("recipientId") recipientId: string
  ) {
    const { count } = await this.countRecipientNotification.execute({ recipientId })

    return count;
  }

  @Get('/from/:recipientId')
  async getFromRecipient(
    @Param("recipientId") recipientId: string
  ) {
    const { notifications } = await this.getRecipientNotification.execute({ recipientId });
    return { notifications: notifications.map(NotificationViewModel.toHTTP) }
  }

  @Put(':id/read')
  async read(
    @Param("id") notificationId: string
  ) {
    await this.readNotification.execute({ notificationId });
  }

  @Put(':id/unread')
  async unread(
    @Param("id") notificationId: string
  ) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Post()
  async createNotification(@Body() createNotification: CreateNotificationDTO) {
    const { category, content, recipientId } = createNotification;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId
    });


    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
