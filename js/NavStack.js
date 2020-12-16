/*
*
* @author Ferhat SAL
* this class is developed for SWE Dynamic Web Assignment
*
* this class uses a couple of stacks , one for next items , one for previous items 
*  
*
*/

class NavStack {


    constructor(pages) {


        this.prevStack = new Stack();
        this.nextStack = new Stack();

        this.current = "";

        //push all pages to the stack in reverse order
        for (let index = pages.length - 1; index >= 0; index--) {

            this.nextStack.push(pages[index]);
        }

        //this.nextStack.logStack();

    }

    next() {

        if (this.nextStack.isEmpty())
            return;

        //first push the current to prev: 
        if (this.current != "")
            this.prevStack.push(this.current);

        let pg = this.nextStack.pop();
        this.current = pg;

        this.nextStack.logStack();
        this.prevStack.logStack();

        return pg;
    }

    prev() {


        if (this.prevStack.isEmpty())
            return;

        //first push the current to prev: 
        if (this.current != "")
            this.nextStack.push(this.current);

        let pg = this.prevStack.pop();
        this.current = pg;


        this.nextStack.logStack();
        this.prevStack.logStack();

        return pg;

    }
}