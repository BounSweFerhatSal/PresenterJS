
/*
* Author : Ferhat SAL - 2018719219 
* Table Of Concept class for SWE Dynamic Web Assigment
*/

class TOC {


    constructor(pageClick_callBack, courseObj) {


        
        this.page_Click = pageClick_callBack;


        //get root element of TOC :
        this.root = document.getElementById("course");
        this.root.innerHTML = "";

        //create toc hierarchy
        courseObj.concepts.forEach(cons => {

            //append a li for each concept
            let conceptLi = Helper.createLi("", cons.id, cons.id , "#");
            this.root.append(conceptLi);

            //append a UL for this concept
            let conceptUl = Helper.createUl(cons.id, "menu")
            conceptLi.append(conceptUl);

            //create page Li's in concept Ul
            let pgIndex = 0;
            cons.pages.forEach(page => {

                let pageLi = Helper.createLi("", page, cons.id, pgIndex);
                conceptUl.append(pageLi);

                //add click event handler : 
                pageLi.onclick = this.page_Click;

                pgIndex++;

            });



        });

    }

   


}