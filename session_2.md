# Session 2

### Objective

Use Node.js to retrieve data from and insert data into the Database. Query a PostgresSQL using Node.js

## Introduction

In the previous session we learned about databases and we used Beekeeper Studio to talk to our database, create table, add some data and modify it. Today we will learn how to CRUD data using JavaScript code in Node.js with pg-promise. 

![database clients](./assets/db-clients.png)

### Getting & Installing VSCode

To write JavaScript code we need a text editor. Any plain text editor would do but I recommend Visual Studio Code (VSCode), because is easy to install, easy to use and has great support for JavaScript code including syntax highlighting and autocomplete suggestions.

![visual studio code screenshot](https://code.visualstudio.com/assets/home/home-screenshot-mac.png)

To download VSCode visit [code.visualstudio.com](https://code.visualstudio.com/)

To install VSCode, execute the downloaded installer.

### Getting & Installing Node.js

JavaScript runs natively in all web browsers, however to run JavaScript in the server (outside of the browser) we need Node.js

![Node.js logo](assets/node-js.png)

To download Node.js visit [nodejs.org/en/download](https://nodejs.org/en/download/). Pick the installer for your computer, Windows, macOS or Linux.

To install Node.js, execute the downloaded installer.

To check if node was installed correctly, open up a terminal window and type:

```sh
node --version
```

This should print your node version if installed or an error if Node is not present. In my case the output is:

```sh
v12.18.2
```

### JavaScript Crash course

If you have never written JavaScript code, you are about to.

#### Variables and Values

Variables are used to store values.

```js
const PI = 3.14 // constants will never change, don't try
let open = false // Variable holding a value of type boolean
let message = "Hi there!" // Variable holding a value of type string
let age = 25 // Variable holding a value of type number
let fruits = ["apple", "pear", "banana"] // Array(list) holding multiple values of type string
```

* To declare a variable we use `const` or `let` followed by a name, to assign a value to a variable we use the equal sign (`=`) followed by a value.
* `let` variables can be updated by typing `open = true` in a different line. This is called reassigning the variable.

#### Objects

Objects are the most useful type of values in JavaScript and most programing languages have their equivalents. Objects are a collection of key-value properties that are efficient and easy to read. They are used to model real world objects in a computer. In our applications we can represent a user as the following collection of key-value pairs:

```js
let user = {
  name: 'Michael Jordan',
  team: 'Chicago Bulls',
  retired: true,
  age: 58
}
```

To access a specific property within an object we use the name of the object followed by a period followed by the property name (a.k.a the key) . So if we want to print MJ's age we can do:

```js
console.log(user.age)
```

##### Object Facts

* Object property values can change. To bring back MJ you can do `user.retired = false`
* You can add new properties that didn't exist `user.championships = 6`
* To delete a property `delete user.age`
* You can represent anything with objects, cars, books, people, planets, objects.
* We will use objects to represent businesses and users in our application.

#### Functions

Function are reusable and encapsulated pieces of code that we can call at will. We will use functions to retrieve and add information to our Database. We need a basic grasp of functions.

```js
// Defining a function
const sayHi = () => {
  console.log("Hello World")
}

sayHi() // Calling/invoking the function
```

The code we will write in this bootcamp should be organized in a folder in your computer. Create a folder called `backend-bootcamp` somewhere you will remeber. Open VSCode and open your folder with it, you can do so in the top menu click `File → Open...`, then select the folder you just created and click open.

In the folder you just opened, create a empty text file by clicking in the menu `File → New File`. Type the code of the function `sayHi` and save your file as `sayHi.js` by clicking  `File → Save`.

Congratulations, you wrote a JavaScript program 🎉 !!.

To execute this program we need to open up a terminal and ask Node.js to run it with the name of the program file. Open a terminal and type.

To open a terminal in VSCode click in the top menu `Terminal → New Terminal`.

To run you JavaScript program with node, in the terminal type:

```sh
node sayHi.js
```

This program simply prints "Hello World" in your terminal.

The anatomy of a JavaScript Function is this:

![js function anatomy](./assests/../assets/js-function.png)

You know you are dealing with a function when you see a set of parenthesis and an arrow, like so: `() => {}` and when you see a name followed by parenthesis like `doWork()`

#### Function Facts

* Functions do work and produce a result.
* Functions are stored in variables.
* Functions are declared and then invoked.
* Once all the statements within the body of the function are done, the function finishes.
* Functions can call other functions. In the `sayHi` example our function calls the `log()` function of `console` by doing `console.log()`
* Functions may or may not return the product of their work. `multiplyByTwo` return the result of multiplying a number `num` by two
* The return value of a function is given to the caller and can be stored in a variable
* Functions without explicit `return` statement return a value of `undefined`
* Functions exist to reuse code
* Functions will retrieve information from the database and print it for us.

### NPM

To write our back-end we will be using some code other developers wrote to help us. This code will come in the form of external packages or modules and we will use NPM to download and install them. NPM stands for the Node Package Manager. Packages are code other developers have written to solve common problems and they make it available for others to use. In fact, the backend we will be building will be a an npm package that we could publish to the npm package registry if we wanted to so that other people could use it. There are many advantages for using npm, some are are keeping our code organized and reusing code so we don't have to reinvent the wheel.

To start a new, empty NPM package, in your VSCode terminal run the `npm` command as follows. `npm` comes with Node.js

```sh
npm init -y
```

Verify that in your folder now there is a file called `package.json`. This file is used to store information about our package, and to keep track of the external packages we download and use, also called the *dependencies* of our code.

### pg-promise

The first packages we will install and use is `pg-promise`. [`pg-promise`](https://www.npmjs.com/package/pg-promise) is a PostgreSQL interface for Node.js, which means it's a package that offers a bunch of functions for us to talk to our PostgreSQL database using Node.js.

To install pg-promise, in the VSCode terminal run

```sh
npm install pg-promise
```

once pg-promise is installed we can import (`require`) it into one of our files so we can use its functions to connect to PostgreSQL.

Create a file called `Businesses.js`. In this file, to import and connect to our Database write the following code:

```js
const pgp = require('pg-promise')(); // Import pg-promise
const DATABASE_URL= 'postgres://jpgnalgc:1bFUAaoVDEyxh7KhFJWWI3SAbuXw2YG4@queenie.db.elephantsql.com:5432/jpgnalgc' // ⚠️ Replace with YOUR database url
const db = pgp(DATABASE_URL) // Connect to database
```

#### Retrieving businesses from the Database

To execute SQL code/queries using `pg-promise` to interact with the database we will write a function and call one of pg-promise's functions with our SQL query.

```js
// Retrieve all businesses
const getAll = async () => {
  try {
    let businesses = await db.any('SELECT * from businesses')
    return businesses
  } catch (err) {
    throw (err)
  }
}

// Main driver code
const main = async () => {
  let result = await getAll() // Calling getAll
  console.log(result) // Printing the result to verify we got one
  process.exit(0) // Exit terminating the program
}

main() // Calling the main function which calls our function
```

To execute this JavaScript program and verify it works we run it with node and the file name.

```js
node Businesses.js
```

In your terminal you should then see a list of JavaScript objects that represent businesses.

<details>
  <summary> Something like this</summary>

```js
[
  {
    id: 2,
    name: 'McGlynn Group',
    phone: '307-420-1232',
    address: '60803 Redwing Junction',
    description: 'Self-enabling upward-trending process improvement',
    picture_url: 'http://dummyimage.com/1280x720.png/5fa2dd/ffffff',
    active: false,
    open_date: 2006-07-28T04:00:00.000Z,
    admin_user_id: 7,
    avg_rating: 2.05
  },
  {
    id: 3,
    name: 'Mayer-Altenwerth',
    phone: '149-189-7388',
    address: '13 Shasta Place',
    description: 'Fundamental client-driven implementation',
    picture_url: 'http://dummyimage.com/1280x720.png/5fa2dd/ffffff',
    active: true,
    open_date: 2009-12-20T05:00:00.000Z,
    admin_user_id: 1,
    avg_rating: 2.17
  },
  {
    id: 4,
    name: 'Gutmann, Von and Bradtke',
    phone: '304-868-3944',
    address: '7766 Forest Dale Street',
    description: 'Distributed eco-centric intranet',
    picture_url: 'http://dummyimage.com/1280x720.png/dddddd/000000',
    active: false,
    open_date: 1985-04-30T04:00:00.000Z,
    admin_user_id: 3,
    avg_rating: 3.9
  },
  {
    id: 5,
    name: 'Roob Group',
    phone: '538-821-9769',
    address: '20745 Weeping Birch Hill',
    description: 'Focused clear-thinking Graphical User Interface',
    picture_url: 'http://dummyimage.com/1280x720.png/cc0000/ffffff',
    active: false,
    open_date: 1990-04-30T04:00:00.000Z,
    admin_user_id: 2,
    avg_rating: 4.99
  },
  {
    id: 6,
    name: "Langworth, O'Hara and Strosin",
    phone: '918-881-0131',
    address: '665 Monterey Alley',
    description: 'Cloned responsive framework',
    picture_url: 'http://dummyimage.com/1280x720.png/cc0000/ffffff',
    active: true,
    open_date: 1986-05-03T04:00:00.000Z,
    admin_user_id: 9,
    avg_rating: 1
  },
  {
    id: 7,
    name: 'Hamill-Oberbrunner',
    phone: '602-908-1522',
    address: '95 Shasta Hill',
    description: 'Down-sized neutral conglomeration',
    picture_url: 'http://dummyimage.com/1280x720.png/dddddd/000000',
    active: true,
    open_date: 2007-06-23T04:00:00.000Z,
    admin_user_id: 10,
    avg_rating: 1.72
  },
  {
    id: 8,
    name: 'Brown, Wyman and Reilly',
    phone: '473-331-1124',
    address: '381 Homewood Street',
    description: 'Organized 6th generation structure',
    picture_url: 'http://dummyimage.com/1280x720.png/cc0000/ffffff',
    active: false,
    open_date: 1975-03-29T04:00:00.000Z,
    admin_user_id: 10,
    avg_rating: 2.29
  },
  {
    id: 9,
    name: 'Shields-Bradtke',
    phone: '200-279-5896',
    address: '81 Pierstorff Way',
    description: 'Realigned homogeneous frame',
    picture_url: 'http://dummyimage.com/1280x720.png/dddddd/000000',
    active: false,
    open_date: 2009-03-23T04:00:00.000Z,
    admin_user_id: 1,
    avg_rating: 2.78
  },
  {
    id: 10,
    name: 'Larkin Group',
    phone: '594-827-1498',
    address: '9 Banding Court',
    description: 'Centralized 6th generation approach',
    picture_url: 'http://dummyimage.com/1280x720.png/cc0000/ffffff',
    active: false,
    open_date: 1980-12-13T05:00:00.000Z,
    admin_user_id: 8,
    avg_rating: 4.11
  }
]
```

</details>

**Notes**:

* `db` in an object that represents the database we are connected to
* `db.any()` is a function we get from `pg-promise`
* We have to use the keyword `await` in front of `db.any`, because we want to wait for the result to come back. `db.any` is asynchronous code, which means we don't know how long it's going to take and whether it will succeed of fail (we don't know how far away is our database and the internet might be down or slow). To learn more about asynchronous code visit [Asynchronous Programming - Eloquent JavaScript](https://eloquentjavascript.net/11_async.html)

#### Retrieving a businesses by its id

```js
const getById = async (id) => {
  try {         
    let business = await db.one('SELECT * from businesses WHERE id = $1', [id])
    return business            // $1 will be the fist element of this list⤴  
  } catch (err) {
    throw (err)
  }
}
```

* Note that this function has a parameter `id`, which is a variable we can use to determine what business we want to retrieve.
* `db.one` in this case takes two arguments, the SQL query string and an array (list) of values to embed in the query.

To try this one out let's modify our `main` function

```js
const main = async () => {
  let result = await getById(2)
  console.log(result)
  process.exit(0)
}
```

When we run this again, no in our terminal we should see printed a single business. The business whose id matches the id we passed to `getById`

**Exercises**:

* Change the id number that is being passed to `getById` and rerun
* Try to retrieve a business by an id that doesn't exist in the database, say `100`

#### Adding a new businesses

```js
const add = async (newBusiness) => {
  try {
    let SQL = `
      INSERT INTO businesses (name, phone, address, description, picture_url, active, open_date, admin_user_id, avg_rating)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *
      `
    let business = await db.one(SQL, [
      newBusiness.name, // Will be embedded in $1
      newBusiness.phone,        // $2
      newBusiness.address,      // $3
      newBusiness.description,  // $4
      newBusiness.picture_url,  // $5
      newBusiness.active,       // $6
      newBusiness.open_date,    // $7
      newBusiness.admin_user_id,// $8
      newBusiness.avg_rating,   // $9
    ])
    return business
  } catch (err) {
    throw (err)
  }
}
```

* To add a new business we need an `INSERT` query
* To embed the values we want to add to the database we specify various `$n` were `n` is the value's position in the list
* We are using the `RETURNING *` statements because `INSERT` queries don't return anything by default. In this case we want to see what was just inserted so we want all its columns (`*`) returned.

To try this our `main` function should look like this:

```js
const main = async () => {
  let business = {
    name: "AMC Empire 25",
    phone: "212-398-2597",
    address: "234 W 42nd St, New York, NY 10036",
    description: "This cinema complex just off Times Square shows mainstream, independent and IMAX films on 25 screens.",
    picture_url: "https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/theatres/552/05520_mobile.jpg",
    active: true,
    open_date: "April 21, 2000",
    admin_user_id: "1",
    avg_rating: 4.1
  }
  let result = await add(business)
  console.log(result)
  process.exit(0)
}

main()
```

<details>
<summary>In the terminal you should see the business you just inserted, with its new id</summary>

```js
{
  id: 23,
  name: 'AMC Empire 25',
  phone: '212-398-2597',
  address: '234 W 42nd St, New York, NY 10036',
  description: 'This cinema complex just off Times Square shows mainstream, independent and IMAX films on 25 screens.',
  picture_url: 'https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/theatres/552/05520_mobile.jpg',
  active: true,
  open_date: 2000-04-21T04:00:00.000Z,
  admin_user_id: 1,
  avg_rating: 4.1
}
```
</details>

#### Updating a Business

The only thing that changes form the `add()` function is the SQL query, in this case an `UPDATE`

```js
const update = async (id, updates) => {
  try {
    let SQL = `
      UPDATE businesses 
      SET name = $1, phone = $2, address = $3, description = $4,
        picture_url = $5, active = $6, open_date = $7, admin_user_id = $8, avg_rating = $9
      WHERE id = $10
      RETURNING *
      `
    let business = await db.one(SQL, [
      updates.name,
      updates.phone,
      updates.address,
      updates.description,
      updates.picture_url,
      updates.active,
      updates.open_date,
      updates.admin_user_id,
      updates.avg_rating,
      id
    ])
    return business
  } catch (err) {
    throw (err)
  }
}
```

To try it out call `update()` and pass a business `id` and a `businessUpdates` object for example:

```js
const main = async () => {
  let businessUpdates = {
    name: "Alejo's Ricos Tacos",
    phone: "917-123-4567",
    address: "1234 Main St, Sometown, NY, 12345",
    description: "Best tacos in town",
    picture_url: "https://cdn.vox-cdn.com/uploads/chorus_image/image/38996208/2013_henrystacos-thumb.0.jpg",
    active: false,
    open_date: "2003-03-10",
    admin_user_id: "1",
    avg_rating: 4.5
  }
  let result = await update(1, businessUpdates) // Updating business with id = 1 with the new information of businessUpdates
  console.log(result)
  process.exit(0)
}

main()
```

* In this case we are updating the entire business, if we wanted to update fewer columns we could write additional code to build the SQL query string dynamically and update only a subset of columns. You can [see here how that is done](https://github.com/alejo4373/Production-Server/blob/1db08baf6ac78dce5e0638576bb9e07a12a69b92/db/todos.js#L151)

#### Deleting a Business

### Exercise

pg-promise & methods
