import { deleteNotification } from "../../api/post/deleteNotification";


const seenNotification = (body) => {
    const notification = deleteNotification({ for: body.for, from: body.from });
    return notification;
}

export { seenNotification }