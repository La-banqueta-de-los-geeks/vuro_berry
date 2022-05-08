// const express = require('express');
const { config } = require('./config/config');
// const routerApi = require('./routes')
// const axios = require('axios');

// const app = express()
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hola mi server en Express");
// });

// routerApi(app)

// const redis = require('redis');
// // const client = redis.createClient(values);


// const client = redis.createClient({ url: config.REDIS_URL });
// // redis://default:vpYcpQAZYzjsrmW0EaV2AIf5dol4jfTi@redis-13478.c263.us-east-1-2.ec2.cloud.redislabs.com:13478
// client.on("error", error => {
//   console.error("ERROR***", error);
// });
// client.on('connect', function () {
//   console.log('Connected!');
//   new_value()
//   publish();
//   client.set("student", "Laylaa", function (err, reply) {
//     console.log(reply);
//   });
//   client.get('student', function (err, reply) {
//     console.log(err, reply);
//   })
// });
// // client.connect()
// (async () => {
//   // Connect to redis server
//   await client.connect();

//   await client.set("key", "test");
//   console.log("Redis Connected!")
//   const value = await client.get("key");
//   console.log(value);

// })();

// app.listen(port, () => {
//   console.log(config)
//   console.log("My port: " + port);
// });

// client.set('foo', 'bar');
// client.set('framework', 'ReactJS', function (err, reply) {
//   console.log(reply); // OK
// });
// client.get('framework', function (err, reply) {
//   console.log(reply); // ReactJS
// });


// const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

// app.get('/users', (req, res) => {
//   try {
//     axios.get(`${USERS_API}`).then(function (response) {
//       const users = response.data;
//       console.log('Users retrieved from the API');
//       // client.setEx('users', 600, JSON.stringify(users));
//       res.status(200).send(users);
//     });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// async function new_value() {
//   await client.set('key', '123');
//   const value = await client.get('key');
//   console.log(value)
// }



// const channel = 'status';

// async function publish() {
//   console.log(`Started ${channel} channel publisher...`)
//   client.publish(channel, 'example');
//   client.publish(channel, 'example');
// }




// var subscriber = redis.createClient({ url: config.REDIS_URL });

// subscriber.on("message", function (channel, message) {
//   console.log("Message: " + message + " on channel: " + channel + " is arrive!");
//  });
//  subscriber.subscribe("notification");

// Import ioredis.
// You can also use `import Redis from "ioredis"`
// if your project is an ESM module or a TypeScript project.
const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis(config.REDIS_URL);

redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style
redis.get("mykey", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
});

// Or ioredis returns a promise if the last argument isn't a function
redis.get("mykey").then((result) => {
  console.log(result); // Prints "value"
});

redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
redis.zrange("sortedSet", 0, 2, "WITHSCORES").then((elements) => {
  // ["one", "1", "dos", "2", "three", "3"] as if the command was `redis> ZRANGE sortedSet 0 2 WITHSCORES`
  console.log(elements);
});

// All arguments are passed directly to the redis server,
// so technically ioredis supports all Redis commands.
// The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`
redis.set("mykey", "hello", "EX", 10);


redis.subscribe("device_port_1","my-channel-1", "my-channel-2","message",'messageBuffer', (err, count) => {
  if (err) {
    // Just like other commands, subscribe() can fail for some reasons,
    // ex network issues.
    console.error("Failed to subscribe: %s", err.message);
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    );
  }
});

redis.on("message", (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
// It's useful when the messages are binary data.
redis.on("device_port_1", (channel, message) => {
  // Both `channel` and `message` are buffers.
  console.log(channel, message);
});
