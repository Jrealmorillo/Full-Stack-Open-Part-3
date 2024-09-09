const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json());

morgan.token("personName", function (req, res) {
  return req.body.name || ''; 
});

morgan.token("personNumber", function (req, res) {
  return req.body.number
})

app.use(morgan(`method :url :status :res[content-length] - :response-time ms {"person":":personName", "number":":personNumber"}`));


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/info", (request, response) => {
  const currentDate = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
      <p>${currentDate}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post("/api/persons", (request, response) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Please enter both name and number"
    })
  }

  const generateId = () => {
    return Math.floor((Math.random() * 100000) + persons.length)
  } 

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()

  }

  const personExists = persons.find(person => person.name === body.name)

  if (personExists) {
    return response.status(400).json({
      error: "Name must be unique"
    })
  } else {
    persons = persons.concat(person)
  }

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})