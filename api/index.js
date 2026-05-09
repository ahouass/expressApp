const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let notes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'CSS is fun', important: false },
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Notes API</h1><p>Use /api/notes to see notes</p>')
})

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

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Endpoint not found' })
}
app.use(unknownEndpoint)

module.exports = app