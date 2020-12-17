/*
* Author : Ferhat SAL - 2018719219 
* Some Useful Funtionalities fro Iframe 
 for SWE Dynamic Web Assigment
*/

class IframeHelper {
 

    static ifrm;

    createIframe() {

        //create Iframe if not exists ( in test case it will be already exits)
        if (IframeHelper.ifrm == undefined) {

            IframeHelper.ifrm = document.createElement("iframe");
            IframeHelper.ifrm.onload = this.iFrameLoad;
            document.getElementById("content").append(IframeHelper.ifrm);
        }
    }

    iFrameLoad = () => {

    }


    static loadPage(_url) {
 
        IframeHelper.ifrm.src = 'courseA/'+ _url;
       

    }


}