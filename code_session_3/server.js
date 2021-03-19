require('dotenv').config();
const express = require('express')
const server = express();
const PORT = process.env.PORT || 3000;
const Businesses = require('./db/Businesses.js')
const { nanoid } = require('nanoid')

server.use(express.json())

server.get('/', (request, response) => {
  response.send('Hello Wold')
})

server.get('/businesses/:id', async (request, response) => {
  try {
    const business = await Businesses.getById(request.params.id)
    const payload = {
      data: business,
      err: false,
      msg: "Successfully retrieved a business"
    }
    response.status(200).send(payload)
  } catch (err) {
    response.status(404).send({
      data: null,
      err: true,
      msg: "Business not found"
    })
  }
})

server.get('/businesses/', async (request, response) => {
  try {
    const businesses = await Businesses.getAll()
    const payload = {
      data: businesses,
      err: false,
      msg: "Successfully retrieved all businesses"
    }
    response.status(200).send(payload)
  } catch (err) {
    response.status(500).send({
      data: null,
      err: true,
      msg: "Failed retrieving all businesses"
    })
  }
})

server.post('/businesses/', async (request, response) => {
  try {
    const newBusiness = request.body
    newBusiness.id = nanoid()
    const business = await Businesses.add(newBusiness)
    const payload = {
      data: business,
      err: false,
      msg: "Successfully added a business"
    }
    response.status(201).send(payload)
  } catch (err) {
    console.log(err)
    response.status(500).send({
      data: null,
      err: true,
      msg: "Failed adding business"
    })
  }
})

server.get('/businesses/', async (request, response) => {
  try {
    const businesses = await Businesses.getAll()
    const payload = {
      data: businesses,
      err: false,
      msg: "Successfully retrieved all businesses"
    }
    response.status(200).send(payload)
  } catch (err) {
    response.status(500).send({
      data: null,
      err: true,
      msg: "Failed retrieving all businesses"
    })
  }
})

server.put('/businesses/:id', async (request, response) => {
  let businessId = request.params.id  // Read the id from the params
  let updates = request.body          // Read the updates from the request payload
  try {
    let updatedBusiness = await Businesses.update(businessId, updates)  // 
    response.status(200).json({
      data: updatedBusiness,
      err: false,
      msg: 'Successfully updated business'
    })
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      updates.id = businessId
      let newBusiness = await Businesses.add(updates)
      response.status(201).json({
        data: newBusiness,
        err: false,
        msg: "Successfully created new business"
      })
    } else {
      console.log(err)
      response.status(500).json({
        err: true,
        msg: 'Failed updating business'
      })
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server listening http://localhost:${PORT}`)
})
