
/*
* Author : Ferhat SAL - 2018719219 
* Table Of Concept class for SWE Dynamic Web Assigment
*/

class TOC {


    constructor(pageClick_callBack) {


        //init helper 
        this.hp = new Helper();

        //set iframe helper 
        this.page_Click = pageClick_callBack;

        //set AllpagesArray :
        this.allPages = [];

        //get root element of TOC :
        this.root = document.getElementById("course");
        this.root.innerHTML = "";

        this.createConseptTitles();
        console.log(this.allPages);

    }

    createConseptTitles() {

        // create concept titles : 
        let mycourse = course().arrConcept;
        mycourse.forEach(item => {

            //append a li for each concept
            let conceptLi = this.hp.createLi("", item, "#");
            this.root.append(conceptLi);

            //append a UL for this concept
            let conceptUl = this.hp.createUl(item, "menu")
            conceptLi.append(conceptUl);

            //create the pages for this concept
            this.createPages(conceptUl, item, true);



        });

    }

    createPages(conceptUl, concept, addtoToc) {

        // create pages : 
        //first get the proper function name : 
        var conceptFnc = concept.substring(1);

        //call concept function and gather pages:
        let cons = eval(conceptFnc + "()");
        let cons_pages = cons.arrPage;
        cons_pages.forEach(page => {


            //check if this is a "concept in concept" or just a normal page
            if (page.substring(0, 1) == "*") {

                //ex: *conteptB in COnceptMixed
                //add this conceps pages to allPages , but dont show in TOC :
                this.createPages(conceptUl, page, false);

            } else {

                //add this page to allpages : 
                this.allPages.push(page);

            }

            if (addtoToc) {

                let pageLi = this.hp.createLi("", page, page);
                conceptUl.append(pageLi);

                //add click event handler : 
                pageLi.onclick = this.page_Click;

            }

        });
    }


}