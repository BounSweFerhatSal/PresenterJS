# PresenterJS

This project is an Assignment for the SP.TP.DYNAMIC WEB Course. 

This is a **pure javascript** , html , css project which is a page navigator that **allow user to navigate through given html pages** stored on local within a structure.All code is developed by Ferhat SAL - Boğaziçi University , MS. Software Engineering. 2018719219.

## Overall Description : 

Project has only one HTML Page : index.html. All the scripts are referenced here. 

- The structure given is in **courseStructure.js** file. 
- The files have to be in the pathes given in the structure. 
- The code is based on OOP
- **No third paty js, css included**
- Navigation is based on a **Stack data structure** , which is developed from scratch.
- Tests are applied without any test framework.

## Classes : 

- `App` :  **the main logic** 
- `Helper` provides some common functionalities for reuse , in order to make code more readable.
- `IFrameHelper` creates the Iframe and handles page loading.
- `Stack` : The pure js **stack implemention.**
- `Course` Creates and Provides the Concepts
- `Concept` Represents a concept as a **double linked list Node** 
- `TOC` :  Table Of Concept class , creates TOC UI and handles the events.
- `Test` :  Apply Test without a test framework. 

## Application Logic

Application starts with  the below  code in the main.js  : 

```js 
let app = new App();
```

This line is **creating an instance of the App class** in APP.js , and the App class starts the logic in it's constructor.

The main logic can be explained as : 

### 1. Create the Course Object & Concept Objects : 

The `Course` object first calls the `course` function which is given in the `courseStructure.js` in order to obtain the **name of the concepts** functions and their order. Then **it calls the corresponding concept function** for each concept **to obtain the pages of the concepts**. To call the concept function specified in the course functions returned object , I'm **using `eval` after removing the '*' char from function name**. For example for given function name as a string : '*conceptB' , I use `eval('concept' + '()')` statement. The real code implementation from the app is below : 

```js 
        //call concept function and gather pages:
        let conseptData = eval(fnc.substring(1) + "()");
```    

After gathering concept data , the Course object creates a new `Concept` object which is implemented in the `Concept.js`. **The course can be though as a `double linked list` and the concept object can be thought as a `double linked list node`.** Then course object add all pages to that `Concept` object calling `addpages`. The crucial thing here if there is another concept reference instead of a normal page in the pages data , I call the `addpages` function recursively in order to add the pages of the sub concept rather then concepts its self as page mistakenly.  

### 2. Create the TOC object 

The `TOC`object is implemented in  `Toc.js` is simply creates nested Unordered Lists UL html elements in the side bar of the app using the Course object created in the previous step. It **assigns the click events of each page to a call back function** , which is used in `App` object. All page elements have `data-concept` and `data-page` in order to specify which page of which concept it will show when it clicked.

### 3. Create the Navigation Stack 

The `Stack` class is  implemented in `Stack.js`. Logic follows with creating a **stack in order to hold 'review levels'.** When user passes to a new concept, **app pushes that concept in to the stack and marks it as `currentConcept`.** if the stack has only one concept , that means user is at root level , in other words it did not in a 'review' level. If there are more then once concepts in stack the top level element of stack is considered as the current level in our logic. The initialization of this stack in code is below : 

```js 
//create Navigation Stack :
    this.navStack = new Stack();

    //set current concept and push it stack
    this.currentConcept = this.courseObj.concepts[0];
    this.navStack.push(this.currentConcept);
```

### 4. Show the first page 

The last level of initializing the App object is simply showing the current concept's first page.

```js
     //show the ifrst page :
      this.currentConcept.show();
```

### 5. Handle Navigation Button Clicks 

The **`nav_next` and the `nav_prev` functions** of the App class **handles the navigation** through the concept and the course. When user clicks to next or previous buttons , app calls the  **next()** or **prev()** function of the concept object which is marked by current concept prop of the app. These functions are set their page index , shows the page and return either a page or the node connections such as `prevConcept` or `nextConcept` , of course if these connections are not set it returns `undefined`. 

Regarding to the type of this return value , app decides either to **jump to the linked course** if the result is an instance of Concept object, or to **return to one level up** in the stack if result is undefined. The other result alternative is getting a string which is a page link , but app ignores this case since there is nothing to do if the return is a page , because this means concept did not came to head or end of concept.

If the `prevConcept` of the concept is undefined and user clicks to prev button , app does nothing , because this can be one of the following situations:
- This is a review concept , and user came to the head of it
- This is the main course concept , not a review , and user came to the very first page of it.
In both situations , app does nothing according to the requirement. 

If the `NextConcept` of the concept is undefined and user clicks to next button , this can be one of the following situations:
- This is a review concept , and user came to the end of it
- This is the main course concept , not a review , and user came to the end of it.
In former situation , app returns one up level. In latter app does nothing.

Below code is shows how app handles jumping to a linked Concept : 

```js

if (ret instanceof Concept) {
      //Concept ended , we have the link to next concept , so go to it :
      this.currentConcept = ret;
      //pop the old one , puh the new one :
      this.navStack.pop();
      this.navStack.push(this.currentConcept);

      //show the ifrst page :
      this.currentConcept.show();

```
 

### 6. Handle TOC page clicks 

App uses the `Toc_Page_Click` call back function as click event handler of TOC links. But the links does not have any href attribute , instead TOC object sets two  `data-concept` and `data-page`while it is creating the links , hence we can get the target concept and page data belongs to link clicked by the user by below code :

```js
    let targetConcept = event.target.getAttribute("data-concept");
    let pageindex = event.target.getAttribute("data-page");

```

After gathering the target , app traverse the course objects concepts to find the target , then it creates a new Concept in order to avoid changing the original object. But app does not copies the `prevConcept` and `nextConcept` props. Because we want the app to get an `undefined` result proc next and prev functions, so the app can understand that this is a review concept and it shoul turn back to 1 up level in the stack. Lastly app pushes this newconcept object to the stack and set it as the currentConcept as shown below : 

```js
//find target concept;
    this.courseObj.concepts.forEach((courseConcept) => {
      if (courseConcept.id == targetConcept) {
        // create a copy ( we dont want to modify the original one !):
        let newConcept = new Concept();

        newConcept.id = courseConcept.id;
        newConcept.pages = courseConcept.pages;
        newConcept.index = pageindex;

        //it's ready  , set this as currentconcept , show the page and  push it to navstack.
        this.currentConcept = newConcept;
        this.currentConcept.show();

        this.navStack.push(newConcept);
```

### 7. Handling Return Button Click

App handles the retun button click in `nav_return` function of app class. This function simply checks if the user is in main course or in a review level then just call the pop() of navStack objcet and sets the top most one as currentConcept as shown below : 


```js
 //We are not in main course , this is a review , pop it and turn back to previous level of stack
      //pop this concept from navstack
      this.navStack.pop();
      //set current concept :
      this.currentConcept = this.navStack.peek();
      //Show current page of concept ( that is where we were exactly in on up level)
      this.currentConcept.show();

```
  
## Tests 

Application can be tested using the `Test` class located in `Test.js`. The test logic is based on : 

- Creating a new app object for each test in order to reset the app to the first state of it 
- Specifying the expected results of each test case 
- Manipulation the UI using code such as clicking buttons or links
- Checking if the expecting results of the manipulations are equals to the expected ones.

Since there is no test framework , I implemented two mandatory functions for each test suite : 

```js

   //assertion functions 
    assertEqual = (expected, actual) => {
        return actual == expected;
    };

    //log results
    logTest = (testName, result) => {
        console.log("Test : " + testName + (result ==true ? " ..................  Passed." : "Failed!!!"));
    };
 

``` 

The test can be triggered by clicking to Test button on the UI.
There are 4 tests in the test class : 

1. test_If_StartPoint_Correct()
2. test_If_NavButtons_Correct()
3. test_If_TOC_Correct()
4. test_If_Return_Correct()

The below example is the test_If_Return_Correct code : 

```js

  test_If_Return_Correct() {

        //first reset the app : 
        this.resetApp();

        //expected back:
        let exp_ReturnPage = this._app.courseObj.concepts[1].pages[2];


        //Apply Next 5 times : goto conceptB 3.page
        for (let index = 0; index < 5; index++) {
            let btnn = document.getElementById("btnNext");
            btnn.click();
    
        }

         //Apply Toc CLikc to Concept A 2.page:
         let link = Helper.select('a[data-concept="conceptA"][data-page="1"]')[0];
         link.click();
 
         //Apply Return Click
        let btnr= document.getElementById("btnReturn");
        btnr.click();
       
         //actual : 
         let curPage_afterReturn = this._app.currentConcept.pages[this._app.currentConcept.index];
         //get result 1
         let result = this.assertEqual(exp_ReturnPage, curPage_afterReturn);
         this.logTest("If_Return_Correct", result);
 
    }

```

This test function follows steps below : 
- Specifies that the expected page is the 3th page of the second concept.
- Clicks to the next button 5 times 
- Clicks to TOC for ConceptA - 2.page link 
- Clicks to Return button.
- Tests if the current page is equal to expected one.


All test results are printed to the console. They all passes , to examine the assesments, click counts or controls can be manipulated to see if the tests fail. 

That's All.

Ferhat SAL.
Boğaziçi University 
MS. in Software Engineering.



 
  

 
