from time import sleep
from ..modules.amqp_worker.job_processing import Worker
import os


def task(body, task_id):
    print(f"[+] task {task_id} started")
    print(f"[+] body: {body}")
    sleep(5)

    result = {"newKey": body}
    print(f"[+] task {task_id} end")
    print(f"[+] result: {result}")
    return result


if __name__ == '__main__':
    print("test start")
    url = 'amqp://localhost'
    worker = Worker(url)
    worker.run(task)
