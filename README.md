# Dungeon Master's Companion

This is my Dungeon Master's Companion application. It's still currently in alpha. Below you can see where the application is currently at in its progress and where I am looking to take this application.

I want this application to be a companion application for Dungeon/Game Master's

## Technolgoies Used To Build Application

Here are the technologies used with this project (SEAN STACK).

```
,___________,         .----------,  _Request_    .------------,         .----------.
|___________|       ,'_________,'|   -> | ->   ,'___________,'|        ( ~--------~ )
| HTML5     |      | AngularJS | |      |      | Node.js    | |        | PostgreSQL |
| CSS3      |      | SweetAlert| |      |      | Express.js | |        | ~--------~ |
| Angular   | <--  | Angular   | |      |      |            | |        |            |        
|  Material |      |  Material | ;   <- | <-   |            | ;        | ~--------~ |
|___________|      |___________|'  _Response_  |____________|'         `.__________.'
   Client           Client Logic            Server & Framework         Database
           *Front End*                                     *Back End*    
```

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PostgreSQL database
  - Please see the database.sql file, it will give you the queries you need to create the database.
  - The database name will have to be called "dmc".

### Installing

Once you clone the repo, you will want to run `npm i` to install all the modules so that the repo should function properly.

Then it will be as simple as typing `npm start` to start up the application and you can access it on your browser at `http://localhost:5000/`

### Alpha Features

- [x] Can register new users and login.
- [x] Toolbar created that shows profile, change log, inspirations, etc.
- [x] Create Campaign.
- [x] Create Characters.
- [x] Create Monsters.
- [x] Create Encounters.
- [ ] Initiative Tracker
- [ ] Delete Campaign
- [ ] Update Campaign, Characters, Monsters, Encounters


### Beta Features

- [ ] Integrate an API or other application to reference D&D source material.
- [ ] Update Profile

## Authors

* Renee Vorbeck

### Biggest Thing I learned With This Project?

* First major project using Angular Material.
* mdDialog popups.
* Creating a POST that handles three queries, two of which are use loops for multiple items.
