import {
  notificationsStore,
  Notification,
} from "@/stores/notifications";

const notification: Notification = {
  id: "123",
  title: "Hello World",
  type: "info",
  message: "This is a notification",
};

describe("notifications store", () => {
  it("should show and dismiss notifications", () => {
    let storeState = notificationsStore.getState();
    expect(storeState.notifications.length).toBe(0);

    storeState.showNotification(notification);
    storeState = notificationsStore.getState();
    expect(storeState.notifications).toContainEqual(notification);

    storeState.dismissNotification(notification.id);
    storeState = notificationsStore.getState();
    expect(storeState.notifications).not.toContainEqual(notification);
  });
});