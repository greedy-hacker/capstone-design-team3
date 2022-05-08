import {TaskManager} from "./taskManager.js";
import {config} from "dotenv";

config({path: '../.env'});
const tm = new TaskManager(process.env.AMQP_HOST)
console.log('[+] setup')
await tm.setup()
console.log('[+] process Response')
await tm.processResponse((id, result) => {
  console.log(`[+] id: ${id}, result: ${JSON.stringify(result)}`)
})

console.log('task send start')
tm.requestTask({task: 'asdf'}, 'id1')
tm.requestTask({task: 'asdf'}, 'id2')
tm.requestTask({task: 'asdf'}, 'id3')
tm.requestTask({task: 'asdf'}, 'id4')
console.log('task send end')
