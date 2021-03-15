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

### Installing and using pg-promise

### Exercise

pg-promise & methods
