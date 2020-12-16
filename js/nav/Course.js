/*
*
* @author Ferhat SAL
* this class is developed for SWE Dynamic Web Assignment
*
* this class represents the course object 
*  
*/
class Course {

    constructor() {

        this.concepts = [];
        this.createConcepts();
       

    }

    createConcepts = () => {

        //call the course function in coursestructure.js  : 
        let mycourse = course().arrConcept;
        mycourse.forEach(item => {

          
            //add pages using this function :
            let newcon = this.addPages(item);

            //set prev & next concept links : 
            if (this.concepts.length > 0) {
                newcon.prevConcept = this.concepts[this.concepts.length - 1];
                newcon.prevConcept.nextConcept = newcon;
            }
            //add this :
            this.concepts.push(newcon);

        });
    }

    //fnc is functioan anme in string ex: "*conceptA"
    //givenCons is for recursive calls
    addPages(fnc,givenCons) {

          
        //call concept function and gather pages:
        let conseptData = eval(fnc.substring(1) + "()");

        //create a new concept object 
        let con =  givenCons !=undefined ?  givenCons : new Concept(conseptData.id);

        // use data to add pgaes of the concept 
        let cons_pages = conseptData.arrPage;
        cons_pages.forEach(page => {

            //check if this is a "concept in concept" or just a normal page
            if (page.substring(0, 1) == "*") {

                //ex: *conteptB in COnceptMixed
                //recursive call and add its pages to this cons
                this.addPages(page,con);  
            } else {
                //add this page to allpages : 
                con.pages.push(page);
            }

        });

        return con;

    }


}