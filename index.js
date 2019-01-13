// Include the redis package
// Be sure to npm install redis
var redis = require('redis');
var PORT = 6379;
var HOST = "najam-lab-redis.5towcp.0001.use1.cache.amazonaws.com";
var client = redis.createClient(PORT, HOST); //creates a new Redis client

// Connect to Redis endpoint
client.on('connect', function() {
    console.log('connected');
    writeRedisKey("myHighScore", "1000");
});
// Write to Redis
function writeRedisKey(keyRedis, value) {
    client.set(keyRedis, value, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
            client.expire(keyRedis, 30); // key expires in 30 s
            readRedisKey(keyRedis);
        }
    });
}

// Read from Redis
function readRedisKey(keyRedis) {
    client.get(keyRedis, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
            var objInfo = {
                info1: "This is info 1",
                info2: "This is info 2",
                info3: "This is info 3"
            };
            writeRedisObject("myInfo", objInfo);
        }
    });
}

// Write Redis Object of keys
function writeRedisObject(objRedis, value) {
    client.hmset(objRedis, value, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
            readRedisObject(objRedis);
        }
    });
}

// Read Redis Object of keys
function readRedisObject(objRedis) {
    client.hgetall(objRedis, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
        }
    });
}
