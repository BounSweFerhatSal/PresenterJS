/*
*
* @author Ferhat SAL
* this class is developed for SWE Dynamic Web Assignment
*
* this class represents a concept as a double linked list Node 
* fires  a callback on next and prev methods with currentpage or linked Concepts   
*/
class Concept {

    constructor(id) {

        this.id = id;

        this.prevConcept = undefined;
        this.nextConcept = undefined;

        this.pages = [];

        this.index = 0;

    }


    next() {

        // have got next page ? 
        if (this.index < this.pages.length - 1) {
            this.index++;
            this.show();
            return this.pages[this.index];

        }
        else {
            return this.nextConcept;
        }

    }

    prev() {

        // have got previous page ? 
        if (this.index > 0) {
            this.index--;
            this.show();
            return this.pages[this.index];

        }
        else {
            return this.prevConcept;
        }

    }


    show() {

        let _url = this.pages[this.index];
        IframeHelper.loadPage(_url);
        document.getElementById("curConcept").innerText =  this.id;
        document.getElementById("curPage").innerText =  _url;

        //arrange button states : 
        Helper.disable("btnPrev");
        Helper.disable("btnNext");
        
       if ((this.index > 0 || this.prevConcept) != undefined) {
           Helper.enable("btnPrev");
       } 
       if ((this.index < this.pages.length - 1) || this.nextConcept != undefined ) {
           Helper.enable("btnNext");
       }
       
    }



    log() {
        console.log("CONCEPT : " + this.id + " pages: " + this.pages);
    }

}