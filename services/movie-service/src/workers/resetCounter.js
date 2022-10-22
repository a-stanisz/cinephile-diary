const User = require('../models/user');

const triggerReset = async () => {
  const currentTime = new Date();
  const firstDayNextMonth = () => {
    const date = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth() + 1);
    return date;
  }
  const triggerTime = firstDayNextMonth();
  console.log(`Scheduled: Basic Users' limit counters will be reset at ${triggerTime.toISOString()}`)
  try {
    setTimeout(async () => {
      const basicUsers = await User.find({ userRole: 'basic' })
          if (basicUsers) {
            for (let user of basicUsers) {
              user.resetCounter;
              console.log(`Success: Basic Users' limit counters have been reset at ${triggerTime.toISOString()}!`)
            }
          }
    }, triggerTime - currentTime)
  }  catch (err) {
    console.error(`Failure: Basic Users' limit counters reset failed!`);
  }
}

module.exports = triggerReset;