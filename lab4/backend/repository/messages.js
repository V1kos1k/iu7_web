const db = require('../db');

class MessagesRepository {
    constructor() {}

    async add(messageModel) {
        const text =
            'INSERT INTO _messages (chat_id, from_user, message, sendTime)' +
            'VALUES ($1, $2, $3, $4)';
        const values = [
            messageModel.chat_id,
            messageModel.from,
            messageModel.message,
            messageModel.sendTime
        ];
        try {
            const res = await db.query(text, values);
            const curID = await db.query(
                "SELECT currval(pg_get_serial_sequence('_messages','id'))"
            );
            const currentChatID = curID.rows[0].currval;

            return currentChatID;
        } catch (err) {
            return false;
        }
    }

    async getAllMessagesByChat(id) {
        const text = 'SELECT * FROM _messages WHERE chat_id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async createDeskChat() {
        const text = 'INSERT INTO _chat (time_creation) VALUES ($1)';
        const values = [new Date().toJSON().slice(0, 10)];
        try {
            const res = await db.query(text, values);
            const curID = await db.query(
                "SELECT currval(pg_get_serial_sequence('_chat','id'))"
            );
            const currentChatID = curID.rows[0].currval;

            return currentChatID;
        } catch (err) {
            return false;
        }
    }

    async _createUsersChatRelation(username, chatID) {
        const text =
            'INSERT INTO _user_chat (user_login, chat_id) VALUES ($1, $2)';
        const values = [username, chatID];
        try {
            const res = await db.query(text, values);
            return true;
        } catch (err) {
            return false;
        }
    }

    async removeAllMessagesFromChat(id) {
        const text = 'DELETE FROM _messages WHERE chat_id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async _getMessagesByUser(user) {
        const text =
            'SELECT DISTINCT chat_id FROM _user_chat WHERE user_login=$1';
        const values = [user];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getChatIDByUsers(first, second) {
        const firtsChats = await this._getMessagesByUser(first);
        const secondChats = await this._getMessagesByUser(second);

        for (let i = 0; i < firtsChats.length; ++i) {
            for (let j = 0; j < secondChats.length; ++j) {
                if (firtsChats[i].chat_id == secondChats[j].chat_id)
                    return firtsChats[i].chat_id;
            }
        }

        return false;
    }

    async removeChat(id) {
        if (!this.removeAllMessagesFromChat(id)) return false;
        const text = 'DELETE FROM _chat WHERE id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async createUsersChat(first, second) {
        const text = 'INSERT INTO _chat (time_creation) VALUES ($1)';
        const values = [new Date().toJSON().slice(0, 10)];
        try {
            const res = await db.query(text, values);
            const curID = await db.query(
                "SELECT currval(pg_get_serial_sequence('_chat','id'))"
            );
            const currentChatID = curID.rows[0].currval;

            if (
                (await this._createUsersChatRelation(first, currentChatID)) &&
                (await this._createUsersChatRelation(second, currentChatID))
            )
                return { isCreated: true, chat_id: Number(currentChatID) };
            else await this.removeChat(chatID);
        } catch (err) {
            return false;
        }
    }

    async getChatInfo(id) {
        const text = 'SELECT * FROM _chat WHERE id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            return res.rows[0];
        } catch (err) {
            return false;
        }
    }

    async getUsernamesByChatID(id) {
        const text = 'SELECT * FROM _user_chat WHERE chat_id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async addToUnreaded(messageModel) {
        const text =
            'INSERT INTO _unread_messages (message_id, chat_id)' +
            'VALUES ($1, $2)';
        const values = [messageModel.id, messageModel.chat_id];
        try {
            const res = await db.query(text, values);
            return true;
        } catch (err) {
            return false;
        }
    }

    async getChatsByUser(user) {
        const text = 'SELECT * FROM _user_chat WHERE user_login=$1';
        const values = [user];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async selectUnreadedIDs(chatID) {
        const text = 'SELECT message_id FROM _unread_messages WHERE chat_id=$1';
        const values = [chatID];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getMessagesByID(id) {
        const text = 'SELECT * FROM _messages WHERE id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async removeUnreaded(messageID, chatID) {
        const text =
            'DELETE FROM _unread_messages WHERE chat_id=$1 AND message_id=$2';
        const values = [chatID, messageID];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = MessagesRepository;
