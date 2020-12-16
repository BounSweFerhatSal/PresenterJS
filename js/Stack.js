/*
*
* @author Ferhat SAL
* this class is developed for SWE Dynamic Web Assignment
*
* methods : 
*  push(newitem) 
*  pop() 
*  peek() 
*  isEmpty() 
*  logStack() 
*
*/


class Stack {

    constructor() {

        //use an array to hold the elements of the stack , in this case pages
        this.items = [];

    }
    push(newitem) {

        // push the given item into the items array 
        if (newitem) {
            this.items.push(newitem);
        }
    }

    pop() {
        // return and remove the item on the top of the stack if stack is not empty 
        if (this.items.length > 0) {
            let popped = this.items.pop();
            return popped;
        }
    }

    peek() {
        //just return the item on the top of the stack if stack is not empty 
        // but does'nt delete it. 
        if (this.items.length > 0)
            return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    logStack() {
        console.log("\nContents of stack:\n------------")
        this.items.forEach(item => {
            console.log("   " + item);
        });

    }

}