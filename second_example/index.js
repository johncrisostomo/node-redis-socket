const express = require('express'),
  config = require('./config'),
  redis = require('redis');

var app = express();

var redisClient = redis.createClient(config.redis_port, config.redis_host);
var publishClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.on('message', (channel, message) => {
  console.log(message);
});

redisClient.subscribe('REQUESTS');

app.get('/', (req, res) => {
  publishClient.publish('REQUESTS', `Request on ${req.socket.localPort} for ${req.url}`);
  console.log(`Local log for ${req.url}`);
});

app.listen(process.argv[2]);
