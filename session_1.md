# Session 1

### Objective

1. Setting up a PostgreSQL Database and understand and execute foundational SQL commands.
2. Understand at a high level how the internet works

## The Internet

The the internet was started in the late 1960's early 1970' as the result of a research project called ARPANET where the US department of defense was trying to build a communication system that could survive a nuclear attack. The researches thought of breaking messages up into blocks and sending them as as fast as possible in every possible direction thought the mesh network. Eventually the researches built a nation wide experimental packet network that worked.

![a network of interconnected computers](https://www.cs.utexas.edu/~mitra/csFall2018/cs329/lectures/fig1.gif)

### IP Addresses

To send a message through this network a way to identify each computer in the network was necessary.This was what the Internet Protocol(IP) came to to solve. The IP protocol dictates that each computer should have and IP address comprised of 4 decimal triplets of the form `xxx.xxx.xxx.xxx` where `xxx` would range between `0-255`. This gave us about 4.1 million addresses.

![IPv4 address in dotted-decimal notation](https://upload.wikimedia.org/wikipedia/commons/7/74/Ipv4_address.svg)

With this, each packet the IP address of the sender and the IP address of the destination in its header. Router computers in the network, running IP routing software are then able direct the message to its destination.

### The World Wide Web

#### Background History

In the early 1980's Tim Berners-Lee a contractor for the European Organization of Nuclear Research (CERN) in Switzerland realized a problem: Researchers (mostly Physicist in this case) from around the world needed to share data but they lacked common machines and software that could present the data so he began implementing a "large hypertext database with typed links" and he thought of using the internet and its TCP/IP protocols to transmit the information of his database to other computers. To solve his colleges information sharing Tim invented:

* The Hypertext Markup Language (HTML), which enabled documents in the network to be linked to other related documents
* The Hypertext transfer protocol (HTTP), which defined the structure of the messages to be exchanged in the network
* The first HTTP server software to server HTML documents
* The first Web Browser to access HTML documents from a server and present them to a reader.


### Server Computers

![client-server diagram](./assets/client-server.png)

Server computers in a network are computers that offer resources or services. Resources can be images, videos, documents, HTML pages, etc. Services could include storage of information, streaming music, cropping pictures, editing word documents or performing some other kinds of computations.

Client computers on a network are computers that request information and services from server computers.

We will be building a back-end or an API for a Business directory application like Yelp.com or yellowpages.com. This back-end will be comprised of a web server and a database server. The web server will provide an interface so that client applications or front-ends can access and modify business information and the Database server will be used for the storage and organization of such data.

With code, we will configure a web server to handle incoming HTTP requests and responds with HTTP responses (collectively HTTP Messages). We will configure the database server to be able to store businesses and users information like name, addresses, pictures etc.

Information will be returned as JSON documents which represent resources (businesses or users). These documents could then be rendered or displayed on a web page or any other Front-end for a user to see and use.

Any full web application could be visualized as the digram bellow.

![the stack](https://raw.githubusercontent.com/joinpursuit/Pursuit-Core-Web/master/node/postgres_and_seeding_databases/assets/fullstack_diagram.png)

## Back-end technologies

### Programing Languages

You can virtually use any programing language to build a Back-end or Web server. Some of the most used languages for back-end development include:

* Python
* JavaScript
* Java
* C#
* PHP
* Ruby

### Web Servers

Developers build frameworks, which are a collection of preconfigured components to build web servers that help other developers get started when building a web server. Some such frameworks per language include

| **JavaScript (Node.js)** | **Python** | **Ruby**      | **PHP**     | **Java** |
| ------------------------ | ---------- | ------------- | ----------- | -------- |
| Express.js               | Django     | Ruby on Rails | Laravel     | Spring   |
| Hapi.js                  | Flask      | Hanami        | Symfony     | JSF      |
| Sails.js                 | Tornado    | Sinatra       | CodeIgniter | Play     |

<sup>*</sup> Not an exhaustive list

### Database Servers

To store, search and organize information there are also multiple solutions

| **Relational**       | **Non-Relational** |
| -------------------- | ------------------ |
| PostgreSQL           | MongoDB            |
| Oracle               | DynamoDB           |
| MySQL                | Firebase           |
| Microsoft SQL Server | Casandra           |

<sup>*</sup> Not an exhaustive list

We will not get into the details of Relational vs Non-Relational (a.k.a SQL vs NOSQL) databases but know that one of the difference reside in the way of retrieving information from the database and the way it is stored.

### Our Tools

**Programing Language**: JavaScript
**Database Server**: PostgreSQL
**Server Framework**: Express.js running in Node.js

For our web server, we will use the JavaScript programming language running in Node.js and a using the Express.js web framework. For our database server we will use PostgreSQL and SQL

## Databases

![definition of database](./assets/database-definition.png)

We will use PostgreSQL also known as Postgres, to store, organize and search the information for our application.

Postgres is a free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.

![postgres logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/330px-Postgresql_elephant.svg.png)

## Setup

To get started with our database is important to note that we will not run or install Postgres ourselves, we will use the [elephansql.com](elephantsql.com) online service to setup and run an empty database we can then configure further to store our app's information.


### Creating a Database

To create an instance of a Postgres Database in elephant.com follow these steps

1. Create an account or Sign in with GitHub or Google (my recommendation) by going to https://customer.elephantsql.com/login
2. Once logged in hit the **Create new instance** button ![create new instance button](./assets/create-instance-btn.png)
3. Fill out the form by giving your database a **name** like `buz_directory_db` and selecting **Plan**: Tiny Turtle (Free). You can leave the tags field empty
4. **Select a region and data center**: Pick any region from the list preferably in the US. Then click the review btn ![review button](./assets/review-btn.png)
5. **Confirm new instance**: Review your database information and hit Create Instance ![create instance confirm btn](./assets/create-instance-confirm.png)

#### Accessing the Database

Once in your ElephantSQL dashboard which displays your database instances **locate** and **click** in the database you just created. In your Database details page find and copy the URL for the database. Your URL would look something like: `postgres://ialnuwjg:RWewY6BlQ0idpnTY4JHAJHBzhwf1hfoz@kashin.db.elephantsql.com:5432/ialnuwjg`

We will use this URL to access and modify the database. Our Server will use the URL to send information to and retrieve information from the database.

To setup our database to store businesses information, we will use Beekeeper Studio, which is SQL editor and Database Manager.

1. Download and install Beekeeper Studio from https://www.beekeeperstudio.io/get
2. Open Beekeeper Studio and connect to your database using the database URL as seen in the gif bellow
![beekeeper studio connecting to elephansql](./assets/connecting-to-elephansql.gif)
3. Once you are connected then you will be able to inspect and modify your database as shown in the next steps

## SQL

SQL (pronounced "ess-que-el") stands for Structured Query Language. SQL is used to communicate with a database. It is the standard language for relational database management systems.

This will be a crash course on SQL. SQL is a wide language but you can get the basics relatively quickly. We will learn how to use it to:

* Create database tables and columns to store data
* Retrieve data from tables
* Insert data into tables
* Update data
* Delete data
* Retrieve data from multiple tables at once

Before we write any SQL code, this diagram represents what information we will store in how it will be stored.

![database diagram with users and businesses tables](./assets/db-diagram-tables.png)

### Creating Tables

To create tables in Postgres we use the `CREATE TABLE` SQL statement followed by the name of the table and in parenthesis the name of the columns and what  type of data they will hold.

To create the **businesses** table from the diagram copy or type the SQL code bellow into the Beekeeper editor and press the **Run** button. If everything goes well you should see the text _"Query Executed Successful. No Results"_ in the lower half of the editor 

```sql
DROP TABLE IF EXISTS "businesses"; -- Because we will be running this a couple of times we want to delete the table if it already exists
CREATE TABLE "businesses" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "phone" VARCHAR,
  "address" VARCHAR,
  "description" VARCHAR,
  "picture_url" VARCHAR,
  "active" BOOLEAN,
  "open_date" DATE,
  "admin_user_id" INT,
  "avg_rating" REAL
);
```

<details>
<summary>Example: </summary>

![business table created](assets/beekeeper-create-table-query.png)

</details>

For the **biz_admin_users** table we will run the following code:

```sql
DROP TABLE IF EXISTS "biz_admin_users"; 
CREATE TABLE "biz_admin_users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR,
  "firstname" VARCHAR,
  "lastname" VARCHAR,
  "phone" VARCHAR
);
```

Lastly we want to express that a business should be associated with a user with by indicating that the `admin_user_id` column in `businesses` refers to the `biz_admin_users.id` column. This is called a foreign Key:

```sql
ALTER TABLE "businesses" ADD FOREIGN KEY ("admin_user_id") REFERENCES "biz_admin_users" ("id");
```

Conceptually this connects the two tables and will let us get all the businesses a specific user administrates and retrieve the user information associated to a business if we need to among other things.

#### Postgres Data types

Data in postgres must be organized in tables and we must specify what type of data each colum will hold. There are a lot of different data types supported for specif needs some are:

| Type          | Description                                        |
| ------------- | -------------------------------------------------- |
| `SERIAL`      | Autoincrementing integer                           |
| `INT`         | Signed four-byte integer                           |
| `BOOLEAN`     | Logical boolean (true/false)                       |
| `REAL`        | Single precision floating points (decimal numbers) |
| `DATE`        | Calendar date (year, month, day                    |
| `TIMESTAMPTZ` | Date and time, including time zone                 |
| `MONEY`       | Currency amount                                    |

For more see https://www.postgresql.org/docs/current/datatype.html

#### CRUD operations

CRUD stands for create, read, update and delete which are the most common operations we do with data. To perform this operations we write SQL statements or also referred to as queries

##### INSERT

The SQL statement `INSERT` is used to insert data into a table. For example to add yourself as a user:

```sql
INSERT INTO biz_admin_users(email, firstname, lastname, phone) 
  VALUES('alejandrofranco@pursuit.org', 'Alejandro', 'Franco', '917-555-1234');
```

💡 Note that the order of the list in parenthesis is important in both lines.

💡 We are not specifying the `id` column because it will automatically be created at insertion time and incremented (i.e its type is `SERIAL`).

**Exercise**: Add a few other users

Let's now insert businesses

```sql
INSERT INTO businesses(
    name,
    phone,
    address,
    description,
    picture_url,
    active,
    open_date,
    admin_user_id,
    avg_rating
  )
VALUES(
    'Alejo''s Tacos',
    '(917) 555-1234',
    '1234 Main St, Sometown, NY, 12345',
    'Best tacos in town',
    'https://cdn.vox-cdn.com/uploads/chorus_image/image/38996208/2013_henrystacos-thumb.0.jpg',
    true,
    '2003-03-10',
    1,
    4.5
  );
```

**Exercise 1**: Insert the following business

| Column        | Value                                                                                   |
| ------------- | --------------------------------------------------------------------------------------- |
| Name          | Wolf, Inc                                                                               |
| Phone         | 917-555-1234,                                                                           |
| Address       | 1234 Main St, Sometown, NY, 12345                                                       |
| Description   | The wolves of steel, meeting all your steel needs since 1923                            |
| Picture URL   | https://www.pm-review.com/wp-content/uploads/2020/11/image_2020_11_25T12_18_46_325Z.png |
| active        | false                                                                                   |
| Open date     | 1993-08-10                                                                              |
| User admin id | 2                                                                                       |
| avg rating    | 3.1                                                                                     |

<details>
<summary>Solution</summary>

```sql
INSERT INTO businesses(
    name,
    phone,
    address,
    description,
    picture_url,
    active,
    open_date,
    admin_user_id,
    avg_rating
  )
VALUES(
    'Wolf, Inc',
    '917-555-1234',
    '1234 Main St, Sometown, NY, 12345',
    'The wolves of steel, meeting all your steel needs since 1923',
    'https://www.pm-review.com/wp-content/uploads/2020/11/image_2020_11_25T12_18_46_325Z.png',
    false,
    '1993-08-10',
    2,
    3.1                                                                                     
  );
```

</details>

##### SELECT

The SQL statement `SELECT` is used to select or retrieve data from the database. It's structure is as follows:

```sql
SELECT select_list
FROM table_name;
```

To select the name and average rating of all businesses

```sql
SELECT name, avg_rating FROM businesses;
```

To get all columns of a business we can use the asterisk (*) character in our list of columns to select from

```sql
SELECT * FROM businesses;
```

We can also retrieve rows that match a specific condition by using the `WHERE` clause

```sql
SELECT name, avg_rating FROM businesses
WHERE active = false;
```

Other operators we can use in the `WHERE` clause are:

| Operator | Description           |
| -------- | --------------------- |
| >        | Greater than          |
| <        | Less than             |
| >=       | Greater than or equal |
| <=       | Less than or equal    |

[Learn more about SELECT](https://www.postgresqltutorial.com/postgresql-select/)
[Learn more about WHERE](https://www.postgresqltutorial.com/postgresql-where/)

##### UPDATE

The structure of an `UPDATE` is as follows:

```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
```

So to update the user with id 1 phone number we can do.

```sql
UPDATE biz_admin_users
SET phone = '369-192-7800'
WHERE id = 1; -- If we don't include a WHERE, all users' phone numbers will be updated 
```

**Exercise**: Update the `open_date` and `avg_rating` of one of the businesses

[Learn more](https://www.postgresqltutorial.com/postgresql-update/)

##### DELETE

The structure of a `DELETE` is as follows:

```sql
DELETE FROM table_name
WHERE condition;
```

For example to delete all inactive businesses:

```sql
DELETE FROM businesses
WHERE active = false;
```

[Learn more](https://www.postgresqltutorial.com/postgresql-delete/)

##### JOIN

Joins allow us to join two or more tables to retrieve information all at once. For example we can select the business with id and 1 along with the user that is associated to it by the foreign key `user_admin_id`

The structure is as follows:

```sql
SELECT select_list
FROM table_a
INNER JOIN table_b ON table_a.column = table_b.colum
```

If we wanted to find the first and last names plus the phone number of the users who businesses with an average rating less that 2

```sql
SELECT biz_admin_users.firstname, biz_admin_users.lastname, biz_admin_users.phone FROM biz_admin_users
INNER JOIN businesses ON businesses.admin_user_id = biz_admin_users.id
WHERE businesses.avg_rating < 2;
```

To get all columns of a businesses alongside the user associated with it

```sql
SELECT * FROM businesses
INNER JOIN biz_admin_users ON businesses.admin_user_id = biz_admin_users.id
```

[Learn more](https://www.postgresqltutorial.com/postgresql-joins/)

## Homework

* Add 5 more users
* Add 10 more businesses
