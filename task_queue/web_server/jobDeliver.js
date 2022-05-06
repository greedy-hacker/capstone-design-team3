import amqp from "amqplib";

export class TaskManager {
  constructor(url) {
    this.url = url;
  }

  async setup() {
    this.conn = await amqp.connect(this.url);
    this.channel = await this.conn.createChannel()

    this.channel.assertQueue("request", {durable: true})
    this.channel.assertQueue("response", {durable: true})
  }

  async processResponse(func) {
    const ch = this.channel;
    await ch.consume("response", async function (msg) {
      const correlationId = msg.properties.correlationId;
      const result = JSON.parse(msg.content.toString())
      await func(correlationId, result)

      await ch.ack(msg)
    })
  }

  async requestTask(data, correlationId) {
    if (!data || !correlationId) {
      throw new Error('no data or no taskId')
    }
    this.channel.sendToQueue("request", Buffer.from(JSON.stringify(data)), {correlationId})
  }

  async checkTaskStatus(id) {
  }

  async getTaskResult(id) {
  }

}