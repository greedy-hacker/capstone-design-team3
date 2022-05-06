from time import sleep

from job_processing import Worker
from dotenv import load_dotenv
import os


def task(body, taskId):
    print(f"[+] task {taskId} started")
    print(f"[+] body: {body}")
    sleep(5)

    result = {"newKey": body}
    print(f"[+] task {taskId} end")
    print(f"[+] result: {result}")
    return result


if __name__ == '__main__':
    print("test start")
    load_dotenv(verbose=True)
    url = os.getenv('AMQP_HOST')
    worker = Worker(url)
    worker.run(task)
