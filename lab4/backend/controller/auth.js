const crypto = require('crypto');
const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');
const UserService = require('../service/user');
const signinSchema = require('../schemas/signin');
const signupSchema = require('../schemas/signup');

function encryptPassword(username, password) {
    const salt = '@#thISiSSAlT*%';
    const toEncrypt = username + password;
    const hash = crypto
        .createHmac('sha256', salt)
        .update(toEncrypt)
        .digest('hex');

    return hash;
}

async function auth(fastify, options) {
    const ajv = new Ajv({ allErrors: true, jsonPointers: true });
    ajvErrors(ajv);

    fastify.post(
        '/signin',
        {
            schema: { body: signinSchema },
            schemaCompiler: signinSchema => {
                const validate = ajv.compile(signinSchema);
                return validate;
            }
        },
        async (req, reply) => {
            const user = new UserService();
            let userModel = req.body;
            userModel.password = encryptPassword(userModel.password);
            const result = user.isUserExists(userModel);

            result.then(success => {
                if (success) {
                    reply.jwtSign(
                        { username: req.body.username },
                        (err, token) => {
                            return reply.send(err || { token: token });
                        }
                    );
                } else {
                    reply.notFound();
                }
            });
        }
    );

    fastify.post(
        '/signup',
        {
            schema: { body: signupSchema },
            schemaCompiler: signupSchema => {
                const validate = ajv.compile(signupSchema);
                return validate;
            }
        },
        async (req, reply) => {
            const user = new UserService();
            let userModel = req.body;
            userModel.password = encryptPassword(userModel.password);
            const result = user.createNewUser(userModel);

            result.then(success => {
                if (success) {
                    reply.jwtSign(
                        { username: req.body.username },
                        (err, token) => {
                            if (!err) {
                                return reply.status(201).send({ token: token });
                            } else {
                                return reply.send(err);
                            }
                        }
                    );
                } else {
                    return reply.conflict();
                }
            });
        }
    );

    fastify.put('/refreshToken', async (req, reply) => {
        req.jwtVerify((err, decoded) => {
            if (err) {
                reply.send(err);
            } else {
                reply.jwtSign({ username: decoded.username }, (err, token) => {
                    if (err) {
                        reply.send(err);
                    }
                    reply.status(201).send({ token: token });
                });
            }
        });
    });
}

module.exports = auth;
