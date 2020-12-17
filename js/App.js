/*
 * Author : Ferhat SAL - 2018719219
 * Application class for SWE Dynamic Web Assigment
 */

class App {
  constructor() {
    //create Iframe helper:
    this.ifHelper = new IframeHelper();
    this.ifHelper.createIframe();

    // crate Course and all concept object
    this.courseObj = new Course();

    //create Toc :
    this.TOC = new TOC(this.Toc_Page_Click, this.courseObj);

    //create Navigation Stack :
    this.navStack = new Stack();

    //set current concept and push it stack
    this.currentConcept = this.courseObj.concepts[0];
    this.navStack.push(this.currentConcept);

    //since we have no return option at the moment disable return button
    Helper.disable("btnReturn");

    //start presntation :
    this.currentConcept.show();

    //bind navigation button click events
    this.bindNavigations();
  }

  bindNavigations() {

    document.getElementById("btnNext").onclick = this.nav_next;
    document.getElementById("btnPrev").onclick = this.nav_prev;
    document.getElementById("btnReturn").onclick = this.nav_return;
  }

  nav_next = () => {

    let ret = this.currentConcept.next();
    // ret can be equal to undefined , a Concept Instance or a string ( page )

    if (ret == undefined) {
      /*
            Concept end but there is no nextConcept link :
            There are 2 possibilities : 
                1. We are in stil main course end we came to last page of last concept
                2. We are not in main course , this is a review 
 
            */

      if (this.navStack.getItemCount() == 1) {
        //We are in stil main course , course ended , do nothing !
        alert("Course Ended");
      } else {
        //We are not in main course , this is a review , return to up level :
        this.nav_return();
      }
      return;
    }

    if (ret instanceof Concept) {
      //Concept ended , we have the link to next concept , so go to it :
      this.currentConcept = ret;
      //pop the old one , puh the new one :
      this.navStack.pop();
      this.navStack.push(this.currentConcept);

      //show the ifrst page :
      this.currentConcept.show();

      return;
    }
  };

  nav_prev = () => {

    let ret = this.currentConcept.prev();
    // ret can be equal to undefined , a Concept Instance or a string ( page )

    if (ret == undefined) {
      /*
            Came to Concept start point there is no prevConcept link :
            Either this is a review Concept or a Main Course Concept , do nothing !
            */
      alert("No Previous Concept in the Course");
    } else {
    }

    if (ret instanceof Concept) {
      //Concept ended , we have the link to prev concept , so go to it :
      this.currentConcept = ret;

      //pop the old one , puh the new one :
      this.navStack.pop();
      this.navStack.push(this.currentConcept);

      //show the ifrst page :
      this.currentConcept.show();

      return;
    }
  };

  nav_return = () => {

    if (this.navStack.getItemCount() == 1) {
      //We are in stil main course , no up level
      //do nothing
    } else {

      //We are not in main course , this is a review , pop it and turn back to previous level of stack
      //pop this concept from navstack
      this.navStack.pop();
      //set current concept :
      this.currentConcept = this.navStack.peek();
      //Show current page of concept ( that is where we were exactly in on up level)
      this.currentConcept.show();

      //diable butyon if we are at root 
      if (this.navStack.getItemCount() == 1) {
        Helper.disable("btnReturn");
      }

    }
  };

  Toc_Page_Click = (event) => {
    
    let targetConcept = event.target.getAttribute("data-concept");
    let pageindex = event.target.getAttribute("data-page");
    if (pageindex == "") return;

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

        Helper.enable("btnReturn");

      }
    });
  };
}
