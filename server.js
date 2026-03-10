const path = require('path')
const express = require('express')
const axios = require('axios')
const app = express()

const apiKey = process.env.HB_API_KEY
if (!apiKey || apiKey === "") {
    console.error("API Key is not set, did you set the HB_API_KEY environment variable to your API key?")
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

let computer
app.get('/computer', async (req, res) => {
  if (computer) {
    res.send(computer)
    return
  }
  const resp = await axios.post('https://engine.hyperbeam.com/v0/vm', {
    start_url: "https://fmhy.net"
  }, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })
  computer = resp.data
  res.send(computer)
})

app.listen(8080, () => {
  console.log('Server start at http://localhost:8080')
})
