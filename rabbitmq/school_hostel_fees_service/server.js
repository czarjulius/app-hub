const amqp = require('amqplib');
const express = require('express');

const server = express();

async function consumeMessages() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange('feeExchange', 'direct');

  const q = await channel.assertQueue('HostelAndSchoolQueue');

  await channel.bindQueue(q.queue, 'feeExchange', 'Hostel');
  await channel.bindQueue(q.queue, 'feeExchange', 'School');

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

server.get('/', async (_, res, __) => {
  res.send({ message: 'Welcome to the school and hostel fee service' });
});

const port = 3003;

server.listen(port, () => {
  consumeMessages();
  console.log(`Server running on port: ${port}`);
});
