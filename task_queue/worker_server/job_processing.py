import json
import time
import pika


class Worker:
    def __init__(self, url):
        self.conn = pika.BlockingConnection(pika.URLParameters(url))
        self.channel = self.conn.channel()
        self.channel.queue_declare(queue='request', durable=True)
        self.channel.queue_declare(queue='response', durable=True)

    def run(self, task):
        def callback(ch, method, props, body):
            # time.sleep(5)
            result = task(json.loads(body), props.correlation_id)
            ch.basic_publish(exchange='', routing_key='response',
                             properties=pika.BasicProperties(correlation_id=props.correlation_id),
                             body=json.dumps(result))
            ch.basic_ack(delivery_tag=method.delivery_tag)

        # self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue='request', on_message_callback=callback)
        self.channel.start_consuming()
