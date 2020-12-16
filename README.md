# PresenterJS

This project is an Assignment for the SP.TP.DYNAMIC WEB Course. 

This is a **pure javascript** , html , css project which is a page navigator that **allow user to navigate through given html pages** stored on local within a structure.All code is dveleped by Ferhat SAL - Boğaziçi University , MS. Software Engineering. 2018719219.

## Overall Description : 

- The structure given is in **courseStructure.js** file. 
- The files have to be in the pathes given in the structure. 
- The code is based on OOP
- **No third paty js, css included**
- Navigation is based on a **Stack data structure** , which is developed from scratch.


## Classes : 

- `App` :  the main logic 
- `Helper` provides some common functionalities for reuse , in order to make code more readable.
- `IFrameHelper` creates the Iframe and handles page loading.
- `Stack` : The pure js stack implemention.
- `NavStack` contains 2 stacks for previous pages and remaining ones, plus the current page.All navigiation is handled by this class
- `TOC` :  Table Of Concept class , creates TOC UI and handles the events.


Given data structure for pages is below:

To play with presenterJS: 
- Just add a new concept to `course` with starting a '*'
- Add the corresponding fucntion that returns concept contents
- Add the pages in  corresponding paths if your concepts uses new pages. 
 
 

```js
const course = function () {
    return {
        "id": "course",
        "arrConcept": [
            '*conceptA',
            '*conceptB',
            '*conceptC',
            '*conceptMixed',
            '*conceptOyOY'
        ]
    }
}

const conceptA = function () {
    return {
        "id": "conceptA",
        "arrPage": [
            'chA/secA/p1.html',
            'chA/secA/p2.html',
            'chA/secA/p3.html'
        ]
    }
}

const conceptB = function () {
    return {
        "id": "conceptB",
        "arrPage": [
            'chA/secB/c1.html',
            'chA/secB/c2.html',
            'chA/secB/c3.html'
        ]
    }
}

const conceptC = function () {
    return {
        "id": "conceptC",
        "arrPage": [
            'chB/secA/d1.html',
            'chB/secA/d2.html',
            'chB/secA/d3.html'
        ]
    }
}

const conceptMixed = function () {
    return {
        "id": "conceptA",
        "arrPage": [
            'chA/secA/p1.html',
            'chB/secA/d1.html',
            'chA/secA/p2.html',
            '*conceptB',
            'chB/secA/d4.html'
        ]
    }
}
const conceptOyOY = function () {
    return {
        "id": "conceptoyy",
        "arrPage": [
            'chA/secA/p1.html',
            '*conceptC',
            'chA/secA/p2.html',
            '*conceptB',
            'chB/secA/d4.html'
        ]
    }
}


```

