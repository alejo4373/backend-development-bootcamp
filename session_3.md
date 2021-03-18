# Session 3

### Objective

Put it all together to build a REST API with Express.js

## What is an API

**A**pplication **P**rogramming **I**interface. 

Let's start with the most important part of an API, the I part, I for Interface

![dictionary definition of interface](./assets/interface-definition.png)

Interfaces are crated for two systems to interact and "talk" to each other. You might not think too much about it but you are a human system interacting with a computer system right now. You interact with the computer via a Graphical User Application (GUI) that engineers created to enable us to be communicate with and control the computer. Where a GUI connects a user and a computer and API connects two applications.

At this point we have code to retrieve and add information to our Database, but so far this functionality is only available to us the developers of this back-end. No external application can interact with our data or functionality, and data is not very useful in a silo. To expose the functionality of adding business, listing all business or updating business to external applications we will build an API in this session. This API will be accessed through HTTP on the web and any application that wants to connect to it to access its services would be able to do so.

APIs exist, so that two or more applications can communicate with each other

![diagram of a client-server API](./assets/api-diagram.png)

## Example of APIs

* [Deck of Cards API](https://deckofcardsapi.com/). An API to simulate a deck of cards. You can create decks, shuffle the deck, draw cards and add cards to piles.
* [Todos API](https://github.com/alejo4373/Todos-API). A simple API for a To-dos application. Let's you create, update, delete and retrieve todos.
* [Yelp API](https://www.yelp.com/developers/documentation/v3). Find businesses by keyword, location
* [YouTube API](https://developers.google.com/youtube/v3). Let's you search for videos, upload videos, manage playlists and subscriptions and more
* [GitHub API](https://docs.github.com/en/rest). Create repos, open/close pull requests or issues. Almost everything you can do on Github.com you can do by calling their API.
* [Dropbox API](https://www.dropbox.com/developers/documentation/http/documentation). Let's work with files in Dropbox, upload, download, search and modify files.
* [Commerce.js API](https://commercejs.com/docs/api/?shell#introduction). Back-end for an eCommerce site, so you don't have to build your own. Create, list, update and delete online store items.

All APIs expect the Deck of Cards API and the Todos API require some ways of authentication via tokens.

Before we can interact with APIs we need to understand their ways of communication. The previous API examples and the API we will build will communicate via HTTP messages (requests & responses) which are define by the HTTP protocol.

### HTTP

Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes. HTTP follows a classical client-server model, with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a stateless protocol, meaning that the server does not keep any data (state) between two requests. [

![internet protocol suit stack](https://cdn.kastatic.org/ka-perseus-images/6a0cd3a5b7e709c2f637c959ba98705ad21e4e3c.svg)

#### HTTP Messages

HTTP messages are how data is exchanged between a server and a client. There are two types of messages: requests sent by the client to trigger an action on the server, and responses, the answer from the server.

HTTP messages are composed of textual information encoded in ASCII, and span over multiple lines. These messages are rarely crafted by hand, instead the web browser or web servers perform this action.

This is what these messages look like

![an HTTP request and response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)

##### HTTP Methods

HTTP defines various methods to be used in requests messages for the server to perform. Some are:

| Method Name | Description                                                                                                       | Our use case                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `GET`       | Requests a representation of the specified resource. Requests using GET should only retrieve data.                | Retrieving all businesses or a single business |
| `POST`      | Used to submit an entity to the specified resource, often causing a change in state or side effects on the server | Adding a new business                          |
| `DELETE`    | Used to delete the specified resource                                                                             | Deleting a business                            |
| `PUT`       | Replaces all current representations of the target resource with the request payload.                             | Fully updating/replacing a business            |
| `PATCH`     | Used to apply partial modifications to a resource.                                                                | Partially updating a business                  |

[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

##### HTTP Status Codes

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Status codes are divided into 5 categories, below them I listed some of the most common per category:

* 1xx informational response – the request was received, continuing process
* 2xx successful – the request was successfully received, understood, and accepted
  * `200 OK` The request has succeeded
  * `201 Created` The requests has succeeded and a new resource has been created as a result
* 3xx redirection – further action needs to be taken in order to complete the request
  * `301 Moved Permanently` The URL of the requested resource has been changed permanently. The new URL is given in the response.
* 4xx client error – the request contains bad syntax or cannot be fulfilled
  * `400 Bad Request`
  * `403 Forbidden`
  * `404 Not Found`
* 5xx server error – the server failed to fulfil an apparently valid request
  * `500 Internal Server Error` The server has encountered a situation it doesn't know how to handle.

To [learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Postman

To test APIs, and to send and inspect HTTP requests and responses we will use the Postman API client

![postman screenshot](https://www.postman.com/assets/response-screenshot.svg)

To download Postman visit https://www.postman.com/downloads/

To install Postman simply execute the downloaded installers

## Consuming APIs

To consume an API a client sends HTTP requests to specific endpoint/urls of the API. Let's try the Deck of Cards API

Open up Postman and create a new request by opening a new tab

![create a new request in postman](./assets/session_3/postman-new-request.png)

Then paste the url for the Deck of Cards API `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1` in the address bar and hit **Send**

![postman address bar](./assets/session_3/postman-address-bar.png)

The response should appear in the bottom half of the Postman window with the result of our request

![postman response screenshot](./assets/session_3/posman-response-body.png)

The Deck of cards doesn't accept POST requests. To try a post request lets use the Todos API. `http://www.todos-api.com/api/users/signup`. 

Change the method to be POST, select Body, then select `x-www-form-urlencoded` and add a `username` field/key with a value, then hit Send. Take a look at the screenshot below.

![postman post request](./assets/session_3/postman-post-request.png)

**Exercise**. Look at the Todos API documentation to learn what resources and endpoints exist, then and try a few other requests. Remember to try the different HTTP methods and be attentive of what status code the API returns.

## Building our API with Express.js

1. Open the folder `backend-bootcamp` we created in the previous session with VSCode.
2. Insider the folder `backend-bootcamp` create a new folder and call it `db`, then move the files we created in the previous session (`Business.js` & `Users.js`) to it. This directory will be reserved to contain the code that interacts with our database using `pg-promise`.
3. Create a new file and call it `server.js`. This file will contain our JavaScript code for our Express.js server
4. Install `express` by opening the VSCode terminal and typing `npm install express`
5. Open `server.js` with VSCode and add the JS code below

```js
const express = require('express')        // Import express
const server = express()                  // Create an Express server
const PORT = process.env.PORT || '3000'   // Read the port from the environment or use port 3000

app.use(express.json())                   // Parse JSON request payloads

server.get('/', (request, response) => {  // Listen for a `GET` request at the root endpoint
  response.send('Hello World')            // Send the text "Hello World" in the response
})

server.listen(PORT, () => {               // Listen for requests coming through port PORT
  console.log(`Server listening on http://localhost:${PORT}`)
})
```

Visit `http://localhost:3000/` in your web browser. The web browser makes a `GET` request to the root endpoint of our server (`/`) and we should see `Hello World` in the page.

### Express routes format

An Express.js route setup follows the following format.

```js
server.[METHOD]('[ENPOINT]', [HANDLER-FUNCTION])
```

Where:

* `[METHOD]` is a lowercased HTTP request method. `get`, `post`, `put`, `delete`, etc.
* `[ENDPOINT]` is a string specifying what endpoint our route to listen at. Examples are `/`, `/users/:id`, etc.
* `[HANDLER-FUNCTION]` is the function that handles and can access the `request` and produces a `response`. In our case the handler function will invoke one of our database functions and send a response with the data from our database.

### Routes or Endpoints to build

| Method   | Endpoint          | Description                             |
| -------- | ----------------- | --------------------------------------- |
| `GET`    | `/businesses/`    | Retrieve all business                   |
| `POST`   | `/businesses/`    | Add a new business                      |
| `GET`    | `/businesses/:id` | Retrieve a single business by id        |
| `PUT`    | `/businesses/:id` | Completely update or replace a business |
| `DELETE` | `/businesses/:id` | Delete a business                       |
| `PATCH`  | `/businesses/:id` | Partially update a business             |

Where `:id` will be a specific business id

### Database Query Functions

Before we go ahead and implement our routes we need to organize the database functions we wrote in the past session. These function will back the routes up.

1. Create a folder in your `backend-bootcamp` folder and call it `db`
2. Move the `Business.js` and `Users.js` files you created in the previous session into the `db` folder.
3. Remove the `main()` functions from the files, we won't need them anymore.
4. At the bottom of both files we need to export each one of our functions so that we can use them in other files. To export functions from a file we use `module.exports`. For example the following exports and objecct with the functions from `Businesses.js`.

```js
// ... bottom of Businesses.js
module.exports = {
  getAll: getAll,
  getById: getById,
  add: add,
  update: update,
  remove: remove
}
```

### Route setup

Once we have our database query functions exported as an object we will be able to use them anywhere we import this object.

To use our database functions in our server include the line of code bellow at the top of `server.js`.

```js
const Businesses = require ('./db/Businesses.js') 
```

### `GET /businesses` route

The route to retrieve all businesses looks like This

```js
server.get('/businesses/', async (request, response) => {
  try {
    let businesses = await Businesses.getAll()  // Call to database function
    let payload = {                
      data: businesses,
      err: false,
      msg: 'Successfully retrieved all businesses'
    }
    response.status(200).json(payload) // Send the response with status 200 and the payload in JSON format
  } catch (err) {
    response.status(500).json({        // If there's an error send status 500 and a JSON payload indicating so
      err: true,
      msg: 'Failed to retrieve all businesses'
    })
  }
})
```

### `GET /businesses/:id` Route

To retrieve a single business by id, we implement the following route

```js
server.get('/businesses/:id', async (request, response) => {
  try {
    let business = await Businesses.getById(request.params.id)
    response.status(200).json({
      data: business,
      err: false,
      msg: 'Successfully retrieved business by id'
    })
  } catch (err) {
    response.status(404).json({
      err: true,
      msg: 'Business not found'
    })
  }
})
```

* `:id` is a variable route parameter and will be accessible through the `request` object by keying into `request.params.id`. To learn more about in the official [Express Documentation - route parameters](https://expressjs.com/en/guide/routing.html#route-parameters)

### `POST /businesses` Route

To add a new business we attend `POST` requests at `/businesses`

```js
server.post('/businesses', async (request, response) => {
  try {
    let newBusiness = request.body // Request JSON payload parsed by app.use(express.json())
    let business = await Businesses.add(newBusiness)
    response.status(201).json({   // Return status `201 Created` upon success
      data: business,
      err: false,
      msg: 'Successfully added a business'
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      err: true,
      msg: 'Failed adding a business'
    })
  }
})
```

To try this route out we will use Postman to send a POST request as explained above in [**Consuming APIs**](./#consuming-apis)

Send JSON payload like the following:

```json
{
    "name": "AMC Empire 25",
    "phone": "212-398-2597",
    "address": "234 W 42nd St, New York, NY 10036",
    "description": "This cinema complex just off Times Square shows mainstream, independent and IMAX films on 25 screens.",
    "picture_url": "https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/theatres/552/05520_mobile.jpg",
    "active": true,
    "open_date": "April 21, 2000",
    "admin_user_id": "1",
    "avg_rating": 4.1
}
```

### `PUT /businesses/:id` Route

To completely update or replace a business we attend `PUT` requests at `/businesses/:id`

```js
server.put('/businesses/:id', async (request, response) => {
  try {
    let businessId = request.params.id  // Read the id from the params
    let updates = request.body          // Read the updates from the request payload
    let updatedBusiness = await Businesses.update(businessId, updates)  // 
    response.status(200).json({
      data: updatedBusiness,
      err: false,
      msg: 'Successfully updated business'
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      err: true,
      msg: 'Failed updating business'
    })
  }
})
```

⚠ The HTTP protocol states that `PUT` should create the resource if it doesn't exist, in our case this route doesn't do this because we would need to implement a different ID generation approach instead of leaving the database pick the IDs for businesses for us with `SERIAL`. Learn more in the [Mozilla Developer Network Documentation about PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)

To try this route send a `PUT` request with a JSON payload using Postman.
️

### `DELETE /businesses/:id` Route

To delete a business we attend `DELETE` requests at `/businesses/:id` and call our database function `Businesses.remove()` in our route handler

```js
server.delete('/business/:id', async (request, response, next) => {
  try {
    let businessId = request.params.id
    await Businesses.remove(businessId)
    response.status(200).json({
      data: null,
      err: false,
      msg: 'Successfully deleted a businesses'
    })
  } catch (err) {
    response.status(500).json({
      err: true,
      msg: 'Failed to delete business'
    })
  }
})
```

Try this out in Postman

## Closing notes

You don't want to have your database URL hardcoded into your database functions code because if you using GitHub or other public source control, it could get exposed giving anyone access to it. Instead you should have the database url in the environment and read it from there. To achieve this

1. Create a file called `.env` in your project's root folder
2. Add your database url to it like so:

    ```sh
    DATABASE_URL=postgres://zuaanwyt:zw0RbnnKE_aFsWgINGWwDDV35Yawdzls@queenie.db.elephantsql.com:5432/zuaanwyt
    ```

3. Make sure the `.env` file is ignored in your source control system. For git that would be adding it to your `.gitignore` file
4. To load the content of the `.env` file to the environment you can use the npm package [`dotenv`](https://www.npmjs.com/package/dotenv)
5. At the top of `server.js` include the following like 

    ```js
    require('dotenv').config()
    ```


### Resources

* [Web technology for developers > HTTP - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP)
* [The Internet Protocol Suit - Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:the-internet-protocol-suite/a/the-internet-protocols#main-content)
