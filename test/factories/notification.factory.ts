import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification(
        {
            category: "Social",
            recipientId: "1234546",
            content: new Content("Você tem uma nova notificação!"),
            ...override
        })
}