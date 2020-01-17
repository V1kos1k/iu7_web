const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');
const DeskService = require('../service/desk');
const ChatService = require('../service/chat');
const createDeskSchema = require('../schemas/createDesk');
const deskSchema = require('../schemas/desks');
const acceptUser = require('../schemas/acceptUser');
const getMembersSchema = require('../schemas/getMembers');
const eventEmitter = require('../events');

async function desks(fastify, options) {
    const ajv = new Ajv({
        removeAdditional: true, // remove additional properties
        useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
        coerceTypes: true, // change data type of data to match type keyword
        allErrors: true, // check for all errors
        nullable: true, // support keyword "nullable" from Open API 3 specification.
        jsonPointers: true
    });
    ajvErrors(ajv);

    fastify.get('/:id', async (req, reply) => {
        const deskID = req.params.id;
        const desk = new DeskService();
        const result = desk.getDesk(deskID);
        result.then(deskInfo => {
            return deskInfo
                ? reply.status(200).send(deskInfo)
                : reply.notFound();
        });
    });

    fastify.get(
        '/',
        {
            schema: { querystring: deskSchema },
            schemaCompiler: deskSchema => {
                const validate = ajv.compile(deskSchema);
                return validate;
            }
        },
        async (req, reply) => {
            const desk = new DeskService();
            const result = desk.getDesksByParams(req.query);
            result.then(deskInfo => {
                return deskInfo
                    ? reply.status(200).send(deskInfo)
                    : reply.notFound();
            });
        }
    );

    fastify.post(
        '/',
        {
            schema: { body: createDeskSchema },
            schemaCompiler: createDeskSchema => {
                const validate = ajv.compile(createDeskSchema);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                const desk = new DeskService();
                let deskModel = req.body;
                deskModel['owner'] = decoded.username;
                const result = desk.createNewDesk(deskModel);
                result.then(ids => {
                    return ids ? reply.status(201).send(ids) : reply.conflict();
                });
            });
        }
    );

    fastify.put('/:id/image', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                reply.send(err);
            }
            const mp = req.multipart(handler, done, options);

            function done(err) {}

            function handler(field, file, filename, encoding, mimetype) {
                const deskID = req.params.id;
                const username = decoded.username;
                const desk = new DeskService();
                let done = desk.changeImage(deskID, username, file);
                done.then(isExisted => {
                    if (isExisted == 1) {
                        return reply.code(200).send();
                    } else if (isExisted == 0) {
                        return reply.code(201).send();
                    } else {
                        return reply.forbidden();
                    }
                });
            }
        });
    });

    fastify.get('/:id/image', async (req, reply) => {
        const desk = new DeskService();
        const res = desk.getImage(req.params.id);
        res.then(imageProp => {
            if (imageProp) {
                reply.header('Content-Type', imageProp.type);
                reply.send(imageProp.image);
            } else {
                reply.notFound();
            }
        });
    });

    fastify.get(
        '/:id/members',
        {
            schema: { querystring: getMembersSchema },
            schemaCompiler: getMembersSchema => {
                const validate = ajv.compile(getMembersSchema);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                const state =
                    req.query.isMember == null ? true : req.query.isMember;
                const desk = new DeskService();
                const res = desk.getMembers(req.params.id, state);
                res.then(members => {
                    return members
                        ? reply.status(200).send(members)
                        : reply.notFound();
                });
            });
        }
    );

    fastify.post('/:id/members', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const desk = new DeskService();
            const res = desk.addMember(req.params.id, decoded.username);
            // -1 - desk is full
            // -2 - doesn't fit by params
            // -3 - no such desk
            // -4 - added for waiting
            res.then(isAccepted => {
                switch (isAccepted) {
                    case -4:
                        eventEmitter.emit(
                            'newWaitingUser',
                            req.params.id,
                            decoded.username
                        );
                        reply.status(200).send({ isIn: false });
                        break;
                    case true:
                        reply.status(200).send({ isIn: true });
                        break;
                    case -1:
                        reply.status(406).send({
                            error: -1,
                            message: 'Current desk is full.'
                        });
                        break;
                    case -2:
                        reply.status(406).send({
                            error: -2,
                            message: 'Not allowed by desk params.'
                        });
                        break;
                    case -3:
                        reply.notFound();
                    default:
                        reply.notAcceptable();
                        break;
                }
            });
        });
    });

    fastify.delete('/:id/members', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const desk = new DeskService();
            const res = desk.removeMember(req.params.id, decoded.username);
            res.then(isRemoved => {
                return isRemoved ? reply.status(200).send() : reply.notFound();
            });
        });
    });

    fastify.put(
        '/:id/members/accept',
        {
            schema: { body: acceptUser },
            schemaCompiler: acceptUser => {
                const validate = ajv.compile(acceptUser);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                const desk = new DeskService();
                const res = desk.acceptMember(
                    req.params.id,
                    req.body.username,
                    decoded.username
                );
                res.then(isAccepted => {
                    if (isAccepted == -1) {
                        return reply.notAcceptable();
                    } else if (isAccepted == true) {
                        reply.status(200).send();
                    } else {
                        reply.notFound();
                    }
                });
            });
        }
    );

    fastify.put(
        '/:id/members/decline',
        {
            schema: { body: acceptUser },
            schemaCompiler: acceptUser => {
                const validate = ajv.compile(acceptUser);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                const desk = new DeskService();
                const res = desk.declineMember(
                    req.params.id,
                    req.body.username,
                    decoded.username
                );
                res.then(isDeclined => {
                    return isDeclined
                        ? reply.status(200).send()
                        : reply.notFound();
                });
            });
        }
    );

    fastify.get('/:id/chat', { websocket: true }, (connection, req, params) => {
        const chatService = new ChatService();
        connection.socket.on('message', message => {
            const deskID = params.id;
            const userMessage = JSON.parse(message);
            chatService.test();
            connection.socket.send(
                `Hi from server.\n I got this message: ${JSON.stringify(
                    userMessage
                )}.\n On desk with id=${deskID}.`
            );
        });
    });
}

module.exports = desks;
