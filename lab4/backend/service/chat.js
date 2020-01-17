const MessagesRepository = require('../repository/messages');
const UserRepository = require('../repository/user');

class ChatService {
    constructor() {
        this.messagesRepository = new MessagesRepository();
        this.userRepository = new UserRepository();
    }

    async createNewDeskChat() {
        return await this.messagesRepository.createDeskChat();
    }

    async createNewUsersChat(first, second) {
        const chat = await this.messagesRepository.getChatIDByUsers(
            first,
            second
        );

        if (chat)
            return {
                isCreated: false,
                chat_id: chat
            };
        else
            return await this.messagesRepository.createUsersChat(first, second);
    }

    async addMessage(messageModel) {
        return this.messagesRepository.add(messageModel);
    }

    async getAllMessages(chatID) {
        return this.messagesRepository.getAllMessagesByChat(chatID);
    }

    async getUsersInChat(id) {
        const usernames = await this.messagesRepository.getUsernamesByChatID(
            id
        );

        if (usernames.length == 0) return false;
        let users = [];
        for (let i = 0; i < usernames.length; ++i) {
            let user = await this.userRepository.getInfo(
                usernames[i].user_login
            );
            if (user) users.push(user);
        }
        return users;
    }

    async getUsernamesByChatID(id) {
        return this.messagesRepository.getUsernamesByChatID(id);
    }

    async addUnreaded(messageModel) {
        return this.messagesRepository.addToUnreaded(messageModel);
    }

    async getUnreaded(chatID) {
        const messageIDs = await this.messagesRepository.selectUnreadedIDs(
            chatID
        );

        let messages = [];

        for (const messageID of messageIDs) {
            const messagesList = await this.messagesRepository.getMessagesByID(
                messageID.message_id
            );
            for (const message of messagesList) {
                messages.push(message);
            }
        }
        return messages;
    }

    async getUserChats(user) {
        return this.messagesRepository.getChatsByUser(user);
    }

    async getChatInfo(id) {
        return this.messagesRepository.getChatInfo(id);
    }

    async getChatsAndUsers(username) {
        const chats = await this.getUserChats(username);
        let res = [];
        if (chats) {
            for (const chat of chats) {
                const chatInfo = await this.messagesRepository.getChatInfo(
                    chat.chat_id
                );
                const usersInChat = await this.getUsernamesByChatID(
                    chat.chat_id
                );
                for (const user of usersInChat) {
                    if (username != user.user_login) {
                        res.push({
                            username: user.user_login,
                            chat_id: chat.chat_id,
                            chat_creation_date: chatInfo.time_creation
                        });
                    }
                }
                res.sort(function(a, b) {
                    return (
                        new Date(a.chat_creation_date) -
                        new Date(b.chat_creation_date)
                    );
                });
            }
        } else res = false;

        return res;
    }

    async removeUnreadedMessages(user, chatID) {
        const messages = await this.messagesRepository.getAllMessagesByChat(
            chatID
        );
        for (const message of messages) {
            if (message.from_user != chatID) {
                this.messagesRepository.removeUnreaded(message.id, chatID);
            }
        }
    }
}

module.exports = ChatService;
