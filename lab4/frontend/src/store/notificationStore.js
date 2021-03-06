import {action, observable, reaction} from "mobx";


export default class NotificationStore {
    constructor(socketStore, userStore, deskStore) {
        this.socketStore = socketStore;
        this.userStore = userStore;
        this.deskStore = deskStore;
        reaction(() => this.socketStore.allNotifications, () => this.allNotifications())

        return this;
    }

    @observable activeNotificationCount = 0;
    @observable notifications = [];
    
    @action
    allNotifications(){
        let newNotifications = this.socketStore.allNotifications.map((data) => {
            return {
                user: this.userStore.getUser(data.username),
                desk_id: data.desk_id,
                deskTitle: data.deskTitle,
            }
        });
        this.activeNotificationCount += newNotifications.length;
        newNotifications.forEach((n) => this.notifications.push(n));
        return this.notifications;
    }

    @action
    acceptUserNotification(notification){
        this.deskStore.acceptUser(notification.desk_id, notification.user.username)
            .then(action(res => {
                this.activeNotificationCount--;
                console.log('ok')
            })).catch(action(err => {
                throw err;
            }))
    }

    @action
    declineUserNotification(notification) {
        this.deskStore.declineUser(notification.desk_id, notification.user.username)
            .then(action(res => {
                this.activeNotificationCount--;
            })).catch(action(err => {
            throw err;
        }))
    }

}