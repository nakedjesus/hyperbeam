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
  try {
    const resp = await axios.post('https://engine.hyperbeam.com/v0/vm', {
      start_url: "https://fmhy.net"
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    })
    computer = resp.data
    res.send(computer)
  } catch (err) {
    console.error("Hyperbeam API error:", err.response?.status, err.response?.data)
    res.status(err.response?.status || 500).json({
      error: "Failed to create session",
      details: err.response?.data
    })
  }
})

// Call this to clear the cached session if it expires
app.get('/reset', (req, res) => {
  computer = null
  res.send("Session reset")
})

app.listen(8080, () => {
  console.log('Server start at http://localhost:8080')
})
