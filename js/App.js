/*
* Author : Ferhat SAL - 2018719219 
* Application class for SWE Dynamic Web Assigment
*/

class App {

    constructor() {

         

        //init helper :
        this.hp = new Helper();

        //create Iframe helper: 
        this.ifHelper = new IframeHelper();
        this.ifHelper.createIframe();

        //create Toc : 
        this.TOC = new TOC(this.Toc_Page_Click);


        //create the initial navStack : 
        this.navStack = new NavStack(this.TOC.allPages);



        //bind navigation button click events
        this.bindNavigations();

        //show first page :
        this.nav_next();

    }

    bindNavigations() {

        document.getElementById('btnNext').onclick = this.nav_next;
        document.getElementById('btnPrev').onclick = this.nav_prev;


    }

    nav_next = () => {

        let pg = this.navStack.next();
        if (pg) {

            this.ifHelper.loadPage(pg);
             
        }
    }

    nav_prev = () => {

        let pg = this.navStack.prev();
        if (pg) {

            this.ifHelper.loadPage(pg);
            
        }
    }


    Toc_Page_Click = (event) => {


        //get the target link of page element : 
        let link = event.target.getAttribute('data-page');

        //load the page given in link to iframe:
        if (link.substring(0, 1) != '*') {
            this.ifHelper.loadPage(link);

            //arrange navigation stack :
            this.navStack = new NavStack(this.TOC.allPages);

            //go next until stack comes to this page:
            while (!this.navStack.nextStack.isEmpty()) {

                if (this.navStack.next() == link) {
                    return;
                }

            }
            console.log("TOC Page Clicked : " + link);
        }





    }


}
