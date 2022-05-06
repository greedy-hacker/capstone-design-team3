import {TaskManager} from "./jobDeliver.js";
import {config} from "dotenv";

config({path: '../.env'});
const tm = new TaskManager(process.env.AMQP_HOST)
console.log('[+] setup')
await tm.setup()
console.log('[+] process Response')
await tm.processResponse((id, result) => {
  console.log(`[+] id: ${id}, result: ${JSON.stringify(result)}`)
})

export async function newTask(msg, id) {
  await tm.requestTask(msg, id);
}