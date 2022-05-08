const taskManager = require('../../amqp_client/taskManager')
const db = require("../../models")
const User = db.users;

async function createNewTask(userId, domain) {
  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  // user(userId).realTimeResult -> null
  // user(userId). realTimeStatus -> PENDING
  await taskManager.requestTask(userId,{domain});
}

async function processTaskResult(taskId, result) {
  //  user(taskId).realTimeResult -> result
  // user(taskId).realTimeStatus -> SUCCESS
  console.log(`[+] id: ${taskId}, result: ${JSON.stringify(result)}`)
}

async function getTaskResult(userId) {
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (user.realTimeStatus === 'READY') return null;
  if (user.realTimeStatus === 'PENDING') return null;
  if (user.realTimeStatus === 'SUCCESS') return user.realTimeResult
  // if user(userId).realTimeStatus is READY, then return null
  // if user(userId).realTimeStatus is PENDING, then return null
  // if user(userId).realTimeStatus is SUCCESS, then return user(userId).realTimeResult
}

module.exports = {
  createNewTask,
  processTaskResult,
  getTaskResult
}