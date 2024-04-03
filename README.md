# Fitness-App
This repository contains my coursework assignment, for the Angular course offered by SoftUni.
This is a system for creating, managing and subscribing for fitness programs. 

## Functionality 
* Registering users.
* Creating and editing programs and exercises for registered users.
* Possibility to subscribe for programs.
* Interactive editor for programs and exercises.
* Interactive UI.

## Technologies 
* HTML, CSS, Angular (with TypeScript).
* Back4app.

## Pages
* Home page.
* Login up page.
* Register up page.
* Programs catalog - page of created programs.
* Program Details - More information for the program, exercise that includes, and the option to subscribe.
* Create program - Create view for program.
* Program Editor - Edit view for program.
* Exercise Editor - Edit view for the exercise of certain program. 

## Data Structure
### Collections 
* Sessions (service)
* Users (service)
```javascript
{
    emails: String,
    username: String,
    password: String
}
```
* Program
```javascript
{
    title: String,
    description: String,
    type: String,
    image: String,
    price: Number,
    owner: Pointer,
    subscribers: Array
}
```
* Exercise
```javascript
{
    owner: Pointer, 
    program: Pointer,
    title: String, 
    sets: Number,
    repetitions: String
}
```

## Accessibility Control
* Guest users can register, browse programs and inspec program details.
* Registered users can create programs add exercises and edit them.
* Registered users that are not owners can subscribe for programs.
* Only the creator of a program can edit and delete it.