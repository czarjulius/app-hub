const amqp = require('amqplib');

const rabbitMQ = {
  url: 'amqp://localhost',
  exchangeName: 'feeExchange',
};

class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, 'direct');

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)));

    console.log(`A new ${routingKey} fee have been detected and sent to ${exchangeName}`);
  }
}

module.exports = Producer;
