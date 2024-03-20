# Fitness-App
This repository contains my coursework assignment, for the Angular course offered by SoftUni.
This is a system for creating, managing and subscribing for fitness programs. 

## Functionality 
* Registering users.
* Creating and editing programs for registered users.
* Possibility to subscribe for programs.
* Interactive editor for programs and exercise.
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
* Profile Page - Information for created programs and subscribed programs.
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
    owner: Pointer
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
* Guest users can register, browse quizzes and inspec quiz details.
* Registered users can create, edit, contest quizzes, inspec their solution results.
* Only the creator of a test can edit and delete the quiz.