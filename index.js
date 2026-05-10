const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'CSS is fun', important: false },
]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (request, response) => {
  const note = {
    id: notes.length + 1,
    content: request.body.content,
    important: request.body.important || false,
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
