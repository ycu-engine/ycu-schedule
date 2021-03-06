/* eslint-disable  */

function handler(data, serverless, options) {
  console.log("Received Stack Output")
  console.dir(data)
}

module.exports = { handler }
