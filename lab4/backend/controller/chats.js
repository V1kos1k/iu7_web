const UserService = require('../service/user');
const DeskService = require('../service/desk');
const ChatService = require('../service/chat');
const eventEmitter = require('../events');

async function chats(fastify, options) {
    let clients = {};

    fastify.post('/users/:username/chatwith', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }

            const chatService = new ChatService();
            let res = chatService.createNewUsersChat(
                decoded.username,
                req.query.user
            );
            res.then(creation => {
                if (creation.isCreated) {
                    eventEmitter.emit('newChat', creation, decoded.username);
                    return reply.status(201).send(creation);
                } else if (!creation.isCreated) {
                    return reply.status(200).send(creation);
                } else {
                    return reply.notAcceptable();
                }
            });
        });
    });

    function _broadcast(users, message, except) {
        users.forEach(user => {
            if (clients[user.user_login] && user.user_login != except) {
                clients[user.user_login].socket.send(message);
            }
        });
    }

    eventEmitter.on('newChat', async function(creation, user) {
        const chatService = new ChatService();
        const withUser = await chatService.getUsernamesByChatID(
            creation.chat_id
        );
        let withUsername = 'error';
        for (const user of withUser) {
            if (user.user_login != user) withUsername = user.user_login;
        }
        const chatInfo = await chatService.getChatInfo(creation.chat_id);
        const message = {
            type: 'chats',
            chats: [
                {
                    chat_id: creation.chat_id,
                    username: user,
                    chat_creation_date: chatInfo.time_creation
                }
            ]
        };

        const selfMessage = {
            type: 'chats',
            chats: [
                {
                    chat_id: creation.chat_id,
                    username: withUsername,
                    chat_creation_date: chatInfo.time_creation
                }
            ]
        };

        if (clients[withUsername]) {
            clients[withUsername].socket.send(JSON.stringify(message));
        }

        if (clients[user]) {
            clients[user].socket.send(JSON.stringify(selfMessage));
        }
    });

    // Send new desk notify while user online
    eventEmitter.on('newWaitingUser', async function(deskID, user) {
        const deskService = new DeskService();
        const deskInfo = await deskService.getDesk(deskID);
        // const waitingUsers = await deskService.getMembers(deskID, false);
        const message = {
            type: 'nu',
            waiting: [
                { username: user, desk_id: deskID, deskTitle: deskInfo.title }
            ]
        };

        if (clients[deskInfo.owner_login]) {
            clients[deskInfo.owner_login].socket.send(JSON.stringify(message));
        }
    });

    // Send desk notifies when user open page
    async function sendDeskWaitingUsers(username) {
        const deskService = new DeskService();
        const userDesks = await deskService.getUsersDesks(username, true);
        let waitingUsers = [];

        if (userDesks) {
            for (let i = 0; i < userDesks.length; ++i) {
                const waiting = await deskService.getMembers(
                    userDesks[i].id,
                    false
                );
                for (const user of waiting) {
                    let data = {
                        username: user.login,
                        desk_id: userDesks[i].id,
                        deskTitle: userDesks[i].title
                    };
                    waitingUsers.push(data);
                }
            }
            let message = { type: 'nu', waiting: waitingUsers };
            clients[username].socket.send(JSON.stringify(message));
        } else {
            const errorMessage = JSON.stringify({
                type: 'nu',
                error: '404',
                message: 'Notification list is empty.',
                waiting: []
            });
            clients[username].socket.send(errorMessage);
        }
    }

    async function sendUnreadedMessages(user) {
        const chatService = new ChatService();
        const chats = await chatService.getUserChats(user);
        let messages = [];

        for (const chat of chats) {
            let unreadedMessages = await chatService.getUnreaded(chat.chat_id);
            for (const message of unreadedMessages) {
                if (user != message.from_user) {
                    message.from = message.from_user;
                    delete message.from_user;
                    messages.push(message);
                }
            }
        }

        const data = {
            type: 'tm',
            messageData: messages
        };
        if (messages.length != 0) {
            clients[user].socket.send(JSON.stringify(data));
        } else {
            const errorMessage = JSON.stringify({
                type: 'tm',
                error: '404',
                message: 'Notification message list is empty.',
                messageData: []
            });
            clients[user].socket.send(errorMessage);
        }
    }

    async function removeMessageFromUnreaded(user, chatID) {
        const chatService = new ChatService();
        await chatService.removeUnreadedMessages(user, chatID);
    }

    async function sendMessagesForChatUsers(message, user) {
        const chatService = new ChatService();
        message.from = user;
        result = await chatService.addMessage(message);
        if (result) {
            let users = await chatService.getUsernamesByChatID(message.chat_id);
            // Write to unreaded messages table
            delete message.type;
            message.id = result;
            await chatService.addUnreaded(message);
            const data = { type: 'tm', messageData: [message] };
            _broadcast(users, JSON.stringify(data), user);
        }
        return result;
    }

    async function sendAllChatMessages(chatID, user) {
        const chatService = new ChatService();
        const messages = await chatService.getAllMessages(chatID);
        messages.forEach(message => {
            message.from = message.from_user;
            delete message.from;
        });
        if (clients[user]) {
            const data = { type: 'gm', messageData: messages };
            clients[user].socket.send(JSON.stringify(data));
            removeMessageFromUnreaded(user, chatID);
        }
    }

    async function sendMessagesForDesk(message, user) {
        const deskService = new DeskService();
        const chatService = new ChatService();
        message.from = user;
        result = await chatService.addMessage(message);
        if (result) {
            message.id = result;
            const desk = await deskService.getByChatID(message.chat_id);
            const members = await deskService.getMembers(desk.id, true);
            const users = [];
            for (const member of members) {
                users.push({ user_login: member.login });
            }
            message.desk_id = desk.id;
            delete message.type;
            const data = { type: 'tdm', messageData: [message] };
            _broadcast(users, JSON.stringify(data), user);
        }
        return result;
    }

    async function _messageManager(message, user) {
        let result = false;
        if (message.type == 'sm') {
            result = sendMessagesForChatUsers(message, user);
        } else if (message.type == 'gm') {
            result = NaN;
            sendAllChatMessages(message.chat_id, user);
        } else if (message.type == 'hu') {
            result = NaN;
            sendDeskWaitingUsers(user);
        } else if (message.type == 'sdm') {
            result = sendMessagesForDesk(message, user);
        } else if (message.type == 'um') {
            result = NaN;
            sendUnreadedMessages(user);
        }

        return result;
    }

    async function sendUserChatList(username) {
        const chatService = new ChatService();
        let res = chatService.getChatsAndUsers(username);
        res.then(chats => {
            if (chats.length != 0 && chats != false) {
                if (clients[username]) {
                    const data = JSON.stringify({
                        type: 'chats',
                        chats: chats
                    });
                    clients[username].socket.send(data);
                }
            } else {
                const errorMessage = JSON.stringify({
                    type: 'chats',
                    error: '400',
                    message: 'Unexpected request',
                    chats: []
                });
                clients[username].socket.send(errorMessage);
            }
        });
    }

    async function onConnectHandler(user) {
        sendDeskWaitingUsers(user);
        sendUnreadedMessages(user);
        sendUserChatList(user);
    }

    fastify.get(
        '/users/:username/chat',
        { websocket: true },
        (connection, req, params) => {
            const username = params.username;
            clients[username] = connection;
            onConnectHandler(username);

            let messageToSend = '';
            connection.socket.on('message', async message => {
                const userMessage = JSON.parse(message);

                const res = await _messageManager(userMessage, username);
                if (res) {
                    messageToSend = JSON.stringify({ result: res });
                    connection.socket.send(messageToSend);
                } else if (isNaN(res)) {
                } else {
                    const errorMessage = JSON.stringify({
                        error: '400',
                        message: 'Unexpected request'
                    });
                    connection.socket.send(errorMessage);
                }
            });

            connection.socket.on('close', message => {
                delete clients[params.username];
            });
        }
    );

    fastify.get('/chats/:id/users', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const chatService = new ChatService();
            let res = chatService.getUsersInChat(req.params.id);
            res.then(users => {
                if (users.length != 0 && users != false)
                    return reply.status(200).send(users);
                else return reply.notFound();
            });
        });
    });

    fastify.get('/users/:username/chats/', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const chatService = new ChatService();
            let res = chatService.getChatsAndUsers(req.params.username);
            res.then(chats => {
                if (chats.length != 0 && chats != false)
                    return reply.status(200).send(chats);
                else return reply.notFound();
            });
        });
    });
}

module.exports = chats;
