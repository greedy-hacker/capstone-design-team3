from time import sleep
from modules.amqp_worker.job_processing import Worker
import os


def task(body, task_id):

    print(f"[+] task {task_id} started")
    print(f"[+] body: {body}")
    sleep(5)

    result = {"newKey": body}
    print(f"[+] task {task_id} end")
    print(f"[+] result: {result}")
    return result


rbmq_host = os.environ.get('RABBITMQ_HOST', 'localhost')
rbmq_user = os.environ.get('RABBITMQ_USER', 'guest')
rbmq_password = os.environ.get('RABBITMQ_PASSWORD', 'guest')

if __name__ == '__main__':
    print("test start")
    url = f'amqp://{rbmq_user}:{rbmq_password}@{rbmq_host}:5672'
    worker = Worker(url)
    worker.run(task)
