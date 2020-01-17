const fastify = require('fastify')();
const config = require('./config');
const cors = require('cors');
var mkdirp = require('mkdirp');
const InitDB = require('./initdb');

// Middleware
fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-multipart'));
fastify.register(require('fastify-websocket'));

// Cors
fastify.use(cors());
fastify.options('*', (reques, reply) => {
    reply.send();
});

// JWT
fastify.register(require('fastify-jwt'), {
    secret: 'ubersecret',
    sign: { expiresIn: '3 days' }
});

// Routes
fastify.register(require('./controller/auth'), { prefix: '/api' });
fastify.register(require('./controller/users'), { prefix: '/api/users' });
fastify.register(require('./controller/desks'), { prefix: '/api/desks' });
fastify.register(require('./controller/chats'), { prefix: '/api' });

// Server
fastify.listen(config.serverPort, config.serverHost, function(err, address) {
    if (err) {
        process.exit(-1);
    } else {
        mkdirp(__dirname + config.userImagePath);
        mkdirp(__dirname + config.deskImagePath);
        const db = new InitDB();
        db.processSQLFile(__dirname + '/createdb.pgsql').then(el => {
            console.log('DB filled succesfully.');
        });
        console.log(`Server is up and running on port ${config.serverPort}...`);
    }
});

module.exports = fastify.pg;
