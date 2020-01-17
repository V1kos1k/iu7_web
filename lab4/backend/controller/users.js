const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');
const UserService = require('../service/user');
const DeskService = require('../service/desk');
const ChatService = require('../service/chat');
const profileSchema = require('../schemas/profile');
const getUsersDesksSchema = require('../schemas/getUsersDesks');

async function users(fastify, options) {
    const ajv = new Ajv({
        removeAdditional: true, // remove additional properties
        useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
        coerceTypes: true, // change data type of data to match type keyword
        allErrors: true, // check for all errors
        nullable: true, // support keyword "nullable" from Open API 3 specification.
        jsonPointers: true
    });
    ajvErrors(ajv);

    fastify.get('/:username/profile', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const user = new UserService();
            const result = user.getProfile(req.params.username);
            result.then(profile => {
                profile ? reply.status(200).send(profile) : reply.notFound();
            });
        });
    });

    fastify.put(
        '/:username/profile',
        {
            schema: { body: profileSchema },
            schemaCompiler: profileSchema => {
                const validate = ajv.compile(profileSchema);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                if (decoded.username == req.params.username) {
                    const user = new UserService();
                    req.body['target'] = req.params.username;
                    const result = user.changeProfile(req.body);
                    result.then(profile => {
                        profile ? reply.status(200).send() : reply.notFound();
                    });
                } else {
                    return reply.forbidden();
                }
            });
        }
    );

    fastify.get('/:username/profile/image', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            const user = new UserService();
            const res = user.getImage(req.params.username);
            res.then(imageProp => {
                if (imageProp) {
                    reply.header('Content-Type', imageProp.type);
                    return reply.send(imageProp.image);
                } else {
                    return reply.notFound();
                }
            });
        });
    });

    fastify.post('/:username/profile/image', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            if (decoded.username == req.params.username) {
                const mp = req.multipart(handler, done, options);

                function done(err) {}

                function handler(field, file, filename, encoding, mimetype) {
                    const user = new UserService();

                    let done = user.addImage(req.params.username, file);
                    done.then(isCreated => {
                        if (isCreated == 1) {
                            return reply.code(201).send();
                        } else if (isCreated == 0) {
                            return reply.conflict();
                        } else {
                            return reply.notAcceptable();
                        }
                    });
                }
            } else {
                return reply.forbidden();
            }
        });
    });

    fastify.put('/:username/profile/image', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                return reply.send(err);
            }
            if (decoded.username == req.params.username) {
                const mp = req.multipart(handler, done, options);

                function done(err) {}

                function handler(field, file, filename, encoding, mimetype) {
                    const user = new UserService();
                    let done = user.changeImage(req.params.username, file);
                    done.then(isExisted => {
                        if (isExisted == 1) {
                            return reply.code(200).send();
                        } else if (isExisted == 0) {
                            return reply.code(201).send();
                        } else {
                            return reply.notAcceptable();
                        }
                    });
                }
            } else {
                return reply.forbidden();
            }
        });
    });

    fastify.get(
        '/:username/desks',
        {
            schema: { querystring: getUsersDesksSchema },
            schemaCompiler: getUsersDesksSchema => {
                const validate = ajv.compile(getUsersDesksSchema);
                return validate;
            }
        },
        async (req, reply) => {
            req.jwtVerify((err, decoded) => {
                if (err) {
                    return reply.send(err);
                }
                const deskService = new DeskService();
                const state =
                    req.query.isOwner == null ? false : req.query.isOwner;
                let res = deskService.getUsersDesks(req.params.username, state);
                res.then(desks => {
                    return desks
                        ? reply.status(200).send(desks)
                        : reply.notFound();
                });
            });
        }
    );
}

module.exports = users;
