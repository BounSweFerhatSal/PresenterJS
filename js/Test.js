/*
 * Author : Ferhat SAL - 2018719219
 * Application class for SWE Dynamic Web Assigment
 */
class Test {


    //rest app : 
    resetApp() {
        //destroy the current App , start a new one :
        let app = new App();
        this._app = app;
    }

    //assertion functions 
    assertEqual = (expected, actual) => {
        return actual == expected;
    };

    //log results
    logTest = (testName, result) => {
        console.log("Test : " + testName + (result ==true ? " ..................  Passed." : "Failed!!!"));
    };
 


    test_If_StartPoint_Correct() {


        //first reset the app : 
        this.resetApp();

        //expected :
        let startConcept = this._app.courseObj.concepts[0];
        let startPage = startConcept.pages[0];

        //actual :
        let curCon = this._app.currentConcept.id;
        let curPage = this._app.currentConcept.pages[this._app.currentConcept.index];

        let result1 = this.assertEqual(startConcept.id, curCon);
        let result2 = this.assertEqual(startPage,curPage);

        this.logTest("If_StartPoint_Correct", result1 & result2);

    }


    test_If_NavButtons_Correct() {

        //first reset the app : 
        this.resetApp();

        //expected next:
        let exp_nextPage = this._app.courseObj.concepts[0].pages[1];
        //expected prev after next:
        let exp_prevPage = this._app.courseObj.concepts[0].pages[0];

        //Apply Next :
        //this._app.nav_next();
        let btnn = document.getElementById("btnNext");
        btnn.click();



        //actual : 
        let curPage_afternext = this._app.currentConcept.pages[this._app.currentConcept.index];
        //get result 1 
        let result1 = this.assertEqual(exp_nextPage, curPage_afternext);


        //Apply prev :
        //this._app.nav_prev();
        let btnp = document.getElementById("btnPrev");
        btnp.click();

        
        //actual : 
        let curPage_afterprev = this._app.currentConcept.pages[this._app.currentConcept.index];
        //get result 1 
        let result2 = this.assertEqual(exp_prevPage, curPage_afterprev);


        this.logTest("If_NavButtons_Correct", result1 & result2);

    }




    test_If_TOC_Correct() {

        //first reset the app : 
        this.resetApp();

        //expected back:
        let exp_nextPage = this._app.courseObj.concepts[0].pages[1];

        //Apply Next :
        document.getElementById("btnNext").click();
        //the click TOC - concept B , page 2 ( 3th page)
        let link = Helper.select('a[data-concept="conceptB"][data-page="2"]')[0];
        link.click();

        //now we have to be in Cıncept B 
        //actual : 
        let curPage_afterToc = this._app.currentConcept.pages[this._app.currentConcept.index];
        //get result 1 
        let result = this.assertEqual(exp_nextPage, curPage_afterToc);
        this.logTest("If_TOC_Correct", result);

    }


    test_If_Return_Correct() {

        //first reset the app : 
        this.resetApp();

        //expected back:
        let exp_ReturnPage = this._app.courseObj.concepts[1].pages[2];


        //Apply Next 6 times : goto conceptc -1.page
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




}


//run the test suite 
document.getElementById("btnTest").onclick = () => {


    let suite = new Test();
   

    suite.test_If_StartPoint_Correct();
    suite.test_If_NavButtons_Correct();
    suite.test_If_TOC_Correct();
    suite.test_If_Return_Correct();
};
